<script setup>
const props = defineProps({
    lists: {
        type: Array,
        default: [],
    },
    title: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    },
})
const listsHard = props.lists
const qustime = ref(10)
const show = ref(true)
const loading = ref(false)

const randomTime = ref(true)
const spendTime = ref(0)
const theAnsValue = ref(10)

const ansList = reactive({
    arr: [],
})
const score = reactive({ arr: [] })
const isAns = ref(false)
const ans = ref('')
const ansText = ref('')
const timeTotal = ref(0)
const total = ref(0)
// const mistakeTime = ref(0)

const nowplay = reactive({
    playlist: '',
    start: '',
    name: '',
    song: '',
})

onMounted(() => {
    var tag = document.createElement('script')

    tag.src = 'https://www.youtube.com/iframe_api'
    var firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
})

var player
function start() {
    if (score.arr.length == qustime.value) {
        score.arr = []
        timeTotal.value = 0
    }
    spendTime.value = 0
    theAnsValue.value = 10
    loading.value = true
    const nextList = listsHard.filter((e) => e.SongID !== nowplay.playlist)
    const a = Math.floor(Math.random() * nextList.length)
    const time = Math.floor(Math.random() * (nextList[a].second * 0.7)) + 1
    nowplay.playlist = nextList[a].SongID
    nowplay.start = randomTime.value ? String(time) : 1
    nowplay.name = nextList[a].Artist
    nowplay.song = nextList[a].SongTitle

    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: nowplay.playlist,
        playerVars: { autoplay: 1 },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError,
        },
    })
    ansShow()
}

async function next() {
    isAns.value = false
    if (score.arr.length == qustime.value) {
        ansText.value = ''
        ans.value = ''
        show.value = true
        spendTime.value = 0
        theAnsValue.value = 10
        loading.value = false
        clearInterval(timer)
        nowplay.start = ''
        nowplay.name = ''
        nowplay.song = ''
        nowplay.playlist = ''
        ansList.arr = []
        score.arr.forEach((e) => {
            if (e.time / 100 <= 2.5) {
                e.currentValue = e.value * 1.5
            } else if (e.time / 100 <= 4 && e.time / 100 > 2.5) {
                e.currentValue = e.value * 1
            } else if (e.time / 100 > 4) {
                e.currentValue = e.value * 0.8
            } else {
                e.currentValue = e.value * 0.5
            }

            total.value += e.currentValue
        })
        await player.destroy()
    } else {
        ansText.value = ''
        ans.value = ''
        show.value = true
        spendTime.value = 0
        theAnsValue.value = 10
        loading.value = true
        clearInterval(timer)
        await player.destroy()
        await start()
    }
}

let timer
function onPlayerReady(e) {
    // e.target.mute()
    e.target.setVolume(90)
    e.target.playVideo()
    e.target.loadVideoById({ videoId: nowplay.playlist, startSeconds: nowplay.start })
    loading.value = false
    timer = setInterval(() => {
        spendTime.value++
    }, 10)
}
function onPlayerStateChange(event) {
    if (event.data == -1) {
        spendTime.value = 0
        loading.value = true
        clearInterval(timer)
    } else if (event.data == 0) {
        spendTime.value = 0
        loading.value = true
        clearInterval(timer)
    } else if (event.data == 1) {
        loading.value = false
        timer = setInterval(() => {
            spendTime.value++
        }, 10)
    } else if (event.data == 2) {
        spendTime.value = 0
        loading.value = true
        clearInterval(timer)
    } else if (event.data == 3) {
        spendTime.value = 0
        loading.value = true
        clearInterval(timer)
    } else if (event.data == 5) {
        spendTime.value = 0
        loading.value = true
        clearInterval(timer)
    }
}
function onPlayerError(e) {
    // e.target.mute()
    next()
}

function showAns() {
    show.value = !show.value
}

function changeFrom() {
    randomTime.value = !randomTime.value
}

function ansShow() {
    ansList.arr = []
    const nextList = listsHard.filter((e) => e.SongID !== nowplay.playlist)
    while (ansList.arr.length < 3) {
        const A = Math.floor(Math.random() * nextList.length)
        if (ansList.arr.filter((e) => e.song == nextList[A].SongTitle).length == 0) {
            ansList.arr.push({ name: nextList[A].Artist, song: nextList[A].SongTitle })
        }
    }
    ansList.arr.push({ name: nowplay.name, song: nowplay.song })
    ansList.arr.forEach((e) => {
        e.ans = 2
        e.clicked = false
    })
    ansList.arr.sort(() => Math.random() - 0.5)
}

function ansChoose(i) {
    if (i.name == nowplay.name && i.song == nowplay.song) {
        isAns.value = true
        i.ans = 1
        show.value = false
        ansText.value = '答對了！！！'
        score.arr.push({ time: spendTime.value, value: theAnsValue.value })
        timeTotal.value += spendTime.value
        clearInterval(timer)
    } else {
        if (!isAns.value) {
            i.ans = 0
            i.clicked = true
            theAnsValue.value -= 3
        }
    }
}

function setQusTime(value) {
    qustime.value = value
}
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center bg-gray-200 p-4">
        <!-- <div class="fixed top-14 left-0 w-auto bg-white text-gray-900 p-4">
            <h1>得分</h1>
            <ul>
                <li v-for="(i, idx) in score.arr" :key="idx">{{ idx + 1 }}：{{ i.time / 100 }} | {{ i.value }}</li>
            </ul>
        </div> -->

        <h1 class="text-2xl font-bold text-gray-900">{{ title }}猜歌測驗</h1>

        <div class="w-full lg:w-[800px] my-4">
            <div class="flex justify-between w-full items-center gap-2 text-sm text-gray-900">
                <div class="flex rounded overflow-hidden divide divide-gray-100 shadow shadow-gray-300">
                    <button
                        @click="changeFrom()"
                        :class="randomTime ? 'bg-primary text-white' : 'bg-white'"
                        class="py-2 w-24"
                    >
                        隨機時間
                    </button>
                    <button
                        @click="changeFrom()"
                        :class="!randomTime ? 'bg-primary text-white' : 'bg-white'"
                        class="py-2 w-24"
                    >
                        從頭播放
                    </button>
                </div>
                <div class="flex rounded overflow-hidden divide divide-gray-100 shadow shadow-gray-300">
                    <!-- <button
                        :disabled="ansList.arr.length > 0 ? true : false"
                        @click="setQusTime(5)"
                        :class="qustime == 5 ? 'bg-primary text-white' : 'bg-white'"
                        class="py-2 w-24"
                    >
                        5題
                    </button> -->
                    <button
                        :disabled="ansList.arr.length > 0 ? true : false"
                        @click="setQusTime(10)"
                        :class="qustime == 10 ? 'bg-primary text-white' : 'bg-white'"
                        class="py-2 w-24"
                    >
                        10題
                    </button>
                </div>
                <!-- <div class="flex items-center">
                    <h1 class="text-sm">
                        測驗題數：<input
                            :disabled="ansList.arr.length > 0 ? true : false"
                            type="number"
                            v-model="qustime"
                            :class="ansList.arr.length > 0 ? 'border-transparent' : 'border-gray-500 rounded'"
                            class="border bg-gray-100 px-1 py-1 w-20"
                        />
                    </h1>
                    <h1 v-show="ansList.arr.length > 0" class="text-sm">剩餘題數：{{ qustime - score.arr.length }}</h1>
                </div> -->
            </div>
            <div class="w-full flex justify-between items-center">
                <p class="text-sm text-gray-900 mt-4">花費時間 {{ spendTime / 100 }}</p>
                <h1 v-show="ansList.arr.length > 0" class="text-sm">剩餘題數：{{ qustime - score.arr.length }}</h1>
            </div>
        </div>

        <div class="flex flex-col items-center space-y-4 w-full lg:w-[800px] bg-white p-4 rounded-md">
            <div class="relative">
                <div class="aspect-w-16 aspect-h-9 w-[90vw] lg:w-[800px]">
                    <div id="player" class="w-full"></div>
                </div>
                <!-- <div class="w-[80vw] lg:w-[560px] h-[30vh] sm:h-[50vh] lg:h-[315px]"></div> -->
                <h1 class="text-xl text-white font-bold mt-4">{{ nowplay.name }} - {{ nowplay.song }}</h1>
                <div
                    class="absolute z-50 top-0 left-0 text-white w-full h-full bg-primary flex flex-col items-center justify-center text-xl"
                    v-show="show"
                >
                    <p v-show="score.arr.length !== qustime">{{ loading ? '找歌中...' : '猜不猜的到拉？？' }}</p>
                    <!-- <p class="text-2xl font-bold mt-5">{{ ansText }}</p> -->
                    <p v-show="score.arr.length == qustime">
                        {{
                            Math.round(total) >= 135
                                ? `你是${name}菁英`
                                : Math.round(total) >= 100
                                ? `你是${name}大師`
                                : Math.round(total) >= 75
                                ? `你是${name}金牌`
                                : Math.round(total) >= 60
                                ? `你是${name}銀牌`
                                : Math.round(total) >= 25
                                ? `你是${name}銅牌`
                                : `你是${name}菜雞`
                        }}
                    </p>
                    <p v-show="score.arr.length == qustime">
                        平均一題花了{{ (timeTotal / 100 / qustime).toFixed(2) }}秒
                    </p>
                    <p v-show="score.arr.length == qustime">總分為{{ Math.round(total) }}分</p>
                </div>
            </div>

            <div class="flex justify-between items-center gap-4 w-full">
                <button
                    v-if="nowplay.playlist !== '' && nowplay.start !== ''"
                    class="bg-primary text-white w-32 py-2 rounded-md hover:bg-primaryHover duration-300"
                    @click="showAns()"
                >
                    {{ show ? '看答案' : '隱藏' }}
                </button>
                <button
                    v-if="nowplay.playlist == ''"
                    class="bg-primary text-white w-full py-2 rounded-md hover:bg-primaryHover duration-300"
                    @click="start()"
                >
                    開始
                </button>
                <button
                    v-if="isAns && nowplay.playlist !== ''"
                    class="bg-primary text-white w-32 py-2 rounded-md hover:bg-primaryHover duration-300"
                    @click="next()"
                >
                    {{ score.arr.length == qustime ? '查看結果' : '下一首' }}
                </button>
            </div>
        </div>
        <div class="flex flex-col items-center gap-2 py-4 w-full lg:w-[800px]">
            <button
                :disabled="i.clicked"
                @click="ansChoose(i)"
                v-for="(i, idx) in ansList.arr"
                :key="idx"
                class="rounded-md w-full p-2 bg-gray-200 duration-200 active:scale-95 hover:cursor-pointer"
                :class="
                    i.ans !== 2
                        ? i.ans == 1
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        : 'text-gray-900 bg-white'
                "
            >
                {{ i.name }} - {{ i.song }}
            </button>
        </div>
    </div>
</template>

<style scoped></style>
