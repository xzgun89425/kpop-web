<script setup>
const router = useRouter()
const props = defineProps({
    mode: {
        type: String,
        default: '',
    },
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
const mistakeTime = ref(0)

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
    if (score.arr.length !== qustime.value) {
        status.value = 1
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
}

async function next() {
    ansList.arr = []
    isAns.value = false
    if (score.arr.length == qustime.value) {
        ansText.value = ''
        ans.value = ''
        show.value = false
        spendTime.value = 0
        theAnsValue.value = 10
        loading.value = false
        clearInterval(timer)
        nowplay.start = ''
        nowplay.name = ''
        nowplay.song = ''
        nowplay.playlist = ''

        if (props.mode == 'all') {
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
        }
        status.value = 2
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
    console.log('ready')
    e.target.mute()
    // e.target.setVolume(90)
    e.target.playVideo()
    e.target.loadVideoById({ videoId: nowplay.playlist, startSeconds: nowplay.start })
}
function onPlayerStateChange(event) {
    if (event.data == -1) {
        console.log('unStart')
        if (props.mode !== 'normal') {
            spendTime.value = 0
            clearInterval(timer)
        }
        loading.value = true
    } else if (event.data == 0) {
        if (props.mode !== 'normal') {
            spendTime.value = 0
            clearInterval(timer)
        }
        loading.value = true
    } else if (event.data == 1) {
        console.log('playing')
        if (event.target.isMuted()) {
            event.target.unMute()
            event.target.setVolume(100)
        }
        // event.target.playVideo()
        // event.target.loadVideoById({ videoId: nowplay.playlist, startSeconds: nowplay.start })
        ansShow()
        loading.value = false
        if (props.mode !== 'normal') {
            timer = setInterval(() => {
                spendTime.value++
            }, 10)
        }
    } else if (event.data == 2) {
        console.log('pause')
        ansList.arr = []
        if (props.mode !== 'normal') {
            spendTime.value = 0
            clearInterval(timer)
        }
        loading.value = true
    } else if (event.data == 3) {
        console.log('loading')
        ansList.arr = []
        if (props.mode !== 'normal') {
            spendTime.value = 0
            clearInterval(timer)
        }
        loading.value = true
    } else if (event.data == 5) {
        if (props.mode !== 'normal') {
            spendTime.value = 0
            clearInterval(timer)
        }
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

        switch (props.mode) {
            case 'all':
                score.arr.push({ time: spendTime.value, value: theAnsValue.value })
                timeTotal.value += spendTime.value
                clearInterval(timer)
                break
            case 'normal':
                score.arr.push(theAnsValue.value)
                total.value += theAnsValue.value
                break
            case 'time':
                score.arr.push(spendTime.value)
                timeTotal.value += spendTime.value
                clearInterval(timer)
                break
            default:
                break
        }
    } else {
        if (!isAns.value) {
            i.ans = 0
            i.clicked = true
            if (props.mode == 'time') {
                mistakeTime.value += 200
            } else {
                theAnsValue.value -= 3
            }
        }
    }
}

function setQusTime(value) {
    qustime.value = value
}
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center bg-gray-200 p-4">
        <!-- <div class="fixed z-[60] top-14 left-0 w-auto bg-white text-gray-900 p-4">
            <h1>得分</h1>
            <ul v-if="mode == 'all'">
                <li v-for="(i, idx) in score.arr" :key="idx">{{ idx + 1 }}：{{ i.time / 100 }} | {{ i.value }}</li>
            </ul>
            <ul v-if="mode == 'time'">
                <li v-for="(i, idx) in score.arr" :key="idx">{{ idx + 1 }}：{{ i / 100 }}</li>
            </ul>
            <ul v-if="mode == 'normal'">
                <li v-for="(i, idx) in score.arr" :key="idx">{{ idx + 1 }}：{{ i }}</li>
            </ul>

            <div v-if="mode == 'all'">
                總得分：{{ total }}
                <span v-show="mistakeTime > 0" class="text-red-500">+{{ mistakeTime }}</span>
            </div>
            <div v-if="mode == 'normal'">總得分：{{ total }}</div>
            <div v-if="mode == 'time'">
                總秒數：{{ timeTotal / 100 }}
                <span v-show="mistakeTime > 0" class="text-red-500">+{{ mistakeTime / 100 }}</span>
            </div>
        </div> -->

        <h1 v-if="status !== 2" class="text-2xl font-bold text-gray-900">
            {{ title }}猜歌測驗 {{ mode == 'time' ? '時間' : mode == 'normal' ? '一般' : '綜合' }}模式
        </h1>

        <Result
            v-if="status == 2"
            :title="title"
            :total="total"
            :timeTotal="timeTotal"
            :qustime="qustime"
            :name="name"
            :score="score.arr"
            :mode="mode"
            :mistakeTime="mistakeTime"
        ></Result>

        <div v-if="status !== 2" class="w-full lg:w-[800px] my-4">
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
                    <button
                        v-if="mode == 'time'"
                        :disabled="ansList.arr.length > 0 ? true : false"
                        @click="setQusTime(5)"
                        :class="qustime == 5 ? 'bg-primary text-white' : 'bg-white'"
                        class="py-2 w-24"
                    >
                        5題
                    </button>
                    <button
                        :disabled="ansList.arr.length > 0 ? true : false"
                        @click="setQusTime(10)"
                        :class="qustime == 10 ? 'bg-primary text-white' : 'bg-white'"
                        class="py-2 w-24"
                    >
                        10題
                    </button>
                </div>
            </div>
            <div class="w-full flex justify-between items-center mt-4">
                <p v-if="mode !== 'normal'" class="text-sm text-gray-900">花費時間 {{ spendTime / 100 }}</p>
                <h1 v-show="ansList.arr.length > 0" class="text-sm">剩餘題數：{{ qustime - score.arr.length }}</h1>
            </div>
        </div>

        <div
            v-if="status !== 2"
            :class="status == 1 ? 'p-4' : 'p-0'"
            class="flex flex-col items-center w-full lg:w-[800px] h-full bg-white rounded-md"
        >
            <div class="relative">
                <div :class="status == 1 ? 'w-[90vw] lg:w-[800px]' : 'w-0'" class="aspect-w-16 aspect-h-9">
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
                    <div v-show="score.arr.length !== qustime">
                        <p>{{ loading ? '找歌中...' : '猜不猜的到拉？？' }}</p>
                        <p v-if="mode !== 'normal'" class="text-sm text-white mt-4">花費時間 {{ spendTime / 100 }}</p>
                    </div>

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

            <div v-if="status !== 2" class="flex justify-between items-center gap-4 w-full">
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
