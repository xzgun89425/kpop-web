<script setup>
const router = useRouter()
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
const status = ref(0)
const listsHard = props.lists
const qustime = ref(10)
const show = ref(false)
const loading = ref(false)

const randomTime = ref(true)
const theAnsValue = ref(10)

const ansList = reactive({
    arr: [],
})
const score = reactive({ arr: [] })
const isAns = ref(false)
const ans = ref('')
const ansText = ref('')
const total = ref(0)

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
    show.value = true
    if (score.arr.length == qustime.value) {
        score.arr = []
        total.value = 0
        status.value = 2
    } else {
        status.value = 1
    }
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
}

async function next() {
    ansList.arr = []
    isAns.value = false
    if (score.arr.length == qustime.value) {
        ansText.value = ''
        ans.value = ''
        show.value = true
        theAnsValue.value = 0
        loading.value = false
        nowplay.start = ''
        nowplay.name = ''
        nowplay.song = ''
        nowplay.playlist = ''
        await player.destroy()
        // router.push({
        //     path: '/result',
        //     query: {
        //         total: total.value,
        //         name: props.name,
        //         title: props.title,
        //         qustime: qustime.value,
        //         mode: 'all',
        //     },
        // })
    } else {
        ansText.value = ''
        ans.value = ''
        show.value = true
        theAnsValue.value = 0
        loading.value = true
        await player.destroy()
        await start()
    }
}

function onPlayerReady(e) {
    // e.target.mute()
    e.target.setVolume(90)
    e.target.playVideo()
    e.target.loadVideoById({ videoId: nowplay.playlist, startSeconds: nowplay.start })
}
function onPlayerStateChange(event) {
    if (event.data == -1) {
        loading.value = true
    } else if (event.data == 0) {
        loading.value = true
    } else if (event.data == 1) {
        loading.value = false
        ansShow()
    } else if (event.data == 2) {
        loading.value = true
    } else if (event.data == 3) {
        loading.value = true
    } else if (event.data == 5) {
        loading.value = true
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
        score.arr.push(theAnsValue.value)
        total.value += theAnsValue.value
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
function reset() {
    router.go(0)
}
</script>

<template>
    <div class="w-full h-full flex flex-col justify-start items-center bg-gray-200 p-4">
        <!-- <div class="fixed top-14 left-0 w-auto bg-white text-gray-900 p-4">
            <h1>得分</h1>
            <ul>
                <li v-for="(i, idx) in score.arr" :key="idx">{{ idx + 1 }}：{{ i }}</li>
            </ul>
            <div>
                總秒數：{{ total }}
                <span v-show="mistakeTime > 0" class="text-red-500">+{{ mistakeTime }}</span>
            </div>
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
            <div class="w-full flex justify-between items-center mt-2">
                <h1 v-show="ansList.arr.length > 0" class="text-sm">剩餘題數：{{ qustime - score.arr.length }}</h1>
            </div>
        </div>

        <div
            :class="status == 1 ? 'p-4' : 'p-0'"
            class="flex flex-col items-center w-full lg:w-[800px] h-full bg-white rounded-md"
        >
            <div class="relative">
                <div :class="status == 1 ? ' w-[90vw] lg:w-[800px]' : 'w-0'" class="aspect-w-16 aspect-h-9">
                    <div id="player" class="w-full"></div>
                </div>
                <!-- <div class="w-[80vw] lg:w-[560px] h-[30vh] sm:h-[50vh] lg:h-[315px]"></div> -->
                <h1 v-if="status == 1" class="text-base lg:text-xl text-gray-900 font-bold my-4 px-2 lg:px-4">
                    {{ nowplay.name }} - {{ nowplay.song }}
                </h1>
                <div
                    class="fixed z-50 top-[64px] left-0 text-white w-full bg-primary h-[calc(100vh-64px)] flex flex-col items-center justify-center text-xl"
                    v-show="show"
                >
                    <p v-show="score.arr.length !== qustime" class="text-sm lg:text-base">
                        {{ loading ? '找歌中...' : '猜不猜的到拉？？' }}
                    </p>
                    <!-- <p class="text-2xl font-bold mt-5">{{ ansText }}</p> -->
                    <p v-show="score.arr.length == qustime">
                        {{
                            total >= 95
                                ? `你是${name}菁英`
                                : total >= 85
                                ? `你是${name}大師`
                                : total >= 75
                                ? `你是${name}金牌`
                                : total >= 65
                                ? `你是${name}銀牌`
                                : total >= 20
                                ? `你是${name}銅牌`
                                : `你是${name}菜雞`
                        }}
                    </p>
                    <p v-show="score.arr.length == qustime">總分為{{ total }}分</p>
                    <button
                        v-if="score.arr.length == qustime"
                        @click="reset()"
                        class="bg-white text-primary px-4 py-1 rounded mt-4 hover:bg-gray-100"
                    >
                        再測一次
                    </button>

                    <div class="w-full flex flex-col items-center gap-2 p-4 lg:w-[800px]">
                        <button
                            :disabled="i.clicked"
                            @click="ansChoose(i)"
                            v-for="(i, idx) in ansList.arr"
                            :key="idx"
                            class="rounded-md text-sm lg:text-base w-full p-2 bg-gray-200 duration-200 active:scale-95 hover:cursor-pointer"
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
    </div>
</template>

<style scoped></style>
