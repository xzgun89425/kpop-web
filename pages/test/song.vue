<script setup>
const { lists } = useBandStore()
const qustime = ref(10)
const show = ref(true)
const loading = ref(false)
const videoShow = ref(true)
const randomTime = ref(true)
const spendTime = ref(0)
const ansList = reactive({
    arr: [],
})
const score = reactive({ arr: [] })
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
    if (score.arr.length == qustime.value) {
        score.arr = []
        total.value = 0
    }
    spendTime.value = 0
    loading.value = true
    const nextList = lists.filter((e) => e.playlist !== nowplay.playlist)
    const a = Math.floor(Math.random() * nextList.length)
    const time = Math.floor(Math.random() * 60) + 1
    nowplay.playlist = nextList[a].playlist
    nowplay.start = randomTime.value ? String(time) : nextList[a].start
    nowplay.name = nextList[a].name
    nowplay.song = nextList[a].song

    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: nowplay.playlist,
        playerVars: { autoplay: 1 },
        events: {
            onReady: onPlayerReady,
        },
    })
    ansShow()
}

async function next() {
    if (score.arr.length == qustime.value) {
        ansText.value = ''
        ans.value = ''
        show.value = true
        spendTime.value = 0
        loading.value = false
        clearInterval(timer)
        nowplay.start = ''
        nowplay.name = ''
        nowplay.song = ''
        nowplay.playlist = ''
        ansList.arr = []
        await player.destroy()
    } else {
        ansText.value = ''
        ans.value = ''
        show.value = true
        spendTime.value = 0
        loading.value = true
        clearInterval(timer)
        await player.destroy()
        await start()
    }
}
let timer
function onPlayerReady(e) {
    // e.target.mute()
    e.target.setVolume(70)
    e.target.playVideo()
    e.target.loadVideoById({ videoId: nowplay.playlist, startSeconds: nowplay.start })
    loading.value = false
    timer = setInterval(() => {
        spendTime.value++
    }, 10)
}

function showAns() {
    show.value = !show.value
}

function changeFrom() {
    randomTime.value = !randomTime.value
}

function ansShow() {
    ansList.arr = []
    const nextList = lists.filter((e) => e.playlist !== nowplay.playlist)
    while (ansList.arr.length < 3) {
        const A = Math.floor(Math.random() * nextList.length)
        if (ansList.arr.filter((e) => e.song == nextList[A].song).length == 0) {
            ansList.arr.push({ name: nextList[A].name, song: nextList[A].song })
        }
    }
    ansList.arr.push({ name: nowplay.name, song: nowplay.song })
    ansList.arr.forEach((e) => {
        e.ans = 2
    })
    ansList.arr.sort(() => Math.random() - 0.5)
}

function ansChoose(i) {
    if (i.name == nowplay.name && i.song == nowplay.song) {
        i.ans = 1
        show.value = false
        ansText.value = '答對了！！！'
        score.arr.push(spendTime.value)
        total.value += spendTime.value
        clearInterval(timer)
    } else {
        i.ans = 0
        total.value = total.value + 100
        ansText.value = '答錯了！！！'
    }
}
</script>

<template>
    <div class="w-full h-screen flex flex-col justify-center items-center bg-zinc-800 p-4">
        <!-- <div class="fixed top-20 left-0 w-auto bg-zinc-900 text-white p-4">
            <h1>得分</h1>
            <ul>
                <li v-for="(i, idx) in score.arr" :key="idx">{{ idx + 1 }}：{{ i / 100 }}</li>
            </ul>
            <div>總秒數：{{ total / 100 }}</div>
        </div> -->
        <p class="text-rose-400 text-xl font-bold">注意：答題選錯一次，答題總時數會加1秒。</p>
        <p class="text-sm text-white my-4">
            評分機制：(每題答題時間的總和 / 題數)<br />
            神：小於1.5秒<br />
            女團博士：1.5 ~ 2.5秒<br />
            女團碩士：2.5 ~ 3.5秒<br />
            女團大學生：3.5 ~ 4秒 <br />
            再練練：大於4秒
        </p>
        <div class="flex flex-col items-center space-y-4 w-full lg:w-[600px] bg-zinc-900 p-4 rounded-md">
            <div class="w-full flex justify-between items-center">
                <div class="flex items-center gap-2 text-sm">
                    <label for="timebtn" class="cursor-pointer" :class="randomTime ? 'text-white' : 'text-gray-300'">{{
                        randomTime ? '隨機時間模式' : '從頭播放模式'
                    }}</label>
                    <div
                        @click="changeFrom()"
                        :class="randomTime ? 'bg-gradient-to-br from-pink-500 to-rose-500 ' : 'bg-gray-500'"
                        class="w-12 h-6 flex justify-center items-center rounded-full cursor-pointer"
                    >
                        <button
                            id="timebtn"
                            name="timebtn"
                            @click.stop="changeFrom()"
                            :class="randomTime ? 'translate-x-3' : '-translate-x-3'"
                            class="w-5 h-5 rounded-full duration-200 bg-white"
                        ></button>
                    </div>
                    <h1 class="text-white text-sm">
                        測驗題數：<input
                            :disabled="ansList.arr.length > 0 ? true : false"
                            type="number"
                            v-model="qustime"
                            :class="ansList.arr.length > 0 ? 'border-transparent' : 'border-white'"
                            class="border bg-zinc-900 px-1 py-1 w-20"
                        />
                    </h1>
                    <h1 v-show="ansList.arr.length > 0" class="text-white text-sm">
                        剩餘題數：{{ qustime - score.arr.length }}
                    </h1>
                </div>
                <p class="text-sm text-white">花費時間 {{ spendTime / 100 }}</p>
            </div>

            <h1 class="text-2xl font-bold text-white">KPOP隨機猜歌測驗</h1>

            <div class="relative">
                <div id="player" class="w-[80vw] lg:w-[560px] h-[30vh] sm:h-[50vh] lg:h-[315px]"></div>
                <h1 class="text-xl text-white font-bold mt-4">{{ nowplay.name }} - {{ nowplay.song }}</h1>
                <div
                    class="absolute z-50 top-0 left-0 text-white w-full h-full bg-gradient-to-br from-pink-500 to-rose-500 flex flex-col items-center justify-center text-xl"
                    v-show="show"
                >
                    <p v-show="score.arr.length !== qustime">{{ loading ? '找歌中...' : '猜不猜的到拉？？' }}</p>
                    <p class="text-2xl font-bold mt-5">{{ ansText }}</p>
                    <p v-show="score.arr.length == qustime">
                        {{
                            total / 100 / qustime < 1.5
                                ? '你是神'
                                : total / 100 / qustime < 2.5
                                ? '你是女團博士'
                                : total / 100 / qustime < 3.5
                                ? '你是女團碩士'
                                : total / 100 / qustime < 4
                                ? '你是女團大學生'
                                : '你需要再練練'
                        }}
                    </p>
                    <p v-show="score.arr.length == qustime">平均一題花了{{ (total / 100 / qustime).toFixed(2) }}秒</p>
                </div>
            </div>

            <div class="flex justify-between items-center gap-4">
                <button
                    v-if="nowplay.playlist !== '' && nowplay.start !== ''"
                    class="bg-gradient-to-br from-pink-500 to-rose-500 text-white w-32 lg:w-40 py-2 rounded-md shadow-lg shadow-rose-800 hover:from-pink-600 hover:to-rose-600 duration-300"
                    @click="showAns()"
                >
                    {{ show ? '看答案' : '隱藏' }}
                </button>
                <button
                    v-if="nowplay.playlist == ''"
                    class="bg-gradient-to-br from-pink-500 to-rose-500 text-white w-32 lg:w-40 py-2 rounded-md shadow-lg shadow-rose-800 hover:from-pink-600 hover:to-rose-600 duration-300"
                    @click="start()"
                >
                    開始
                </button>
                <button
                    v-if="ansText == '答對了！！！' && nowplay.playlist !== ''"
                    class="bg-gradient-to-br from-pink-500 to-rose-500 text-white w-32 lg:w-40 py-2 rounded-md shadow-lg shadow-rose-800 hover:from-pink-600 hover:to-rose-600 duration-300"
                    @click="next()"
                >
                    {{ score.arr.length == qustime ? '查看結果' : '下一首' }}
                </button>
            </div>
        </div>
        <div class="flex flex-col items-center gap-2 py-4 w-full lg:w-[600px]">
            <button
                @click="ansChoose(i)"
                v-for="(i, idx) in ansList.arr"
                :key="idx"
                class="rounded-md w-full py-2 hover:bg-pink-500 hover:text-white duration-200 active:scale-95"
                :class="
                    i.ans !== 2
                        ? i.ans == 1
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        : 'text-pink-500 bg-white'
                "
            >
                {{ i.name }} - {{ i.song }}
            </button>
        </div>
    </div>
</template>

<style scoped></style>
