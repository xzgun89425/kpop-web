<script setup>
const { lists } = useBandStore()
const show = ref(true)
const loading = ref(false)
const videoShow = ref(true)
const randomTime = ref(true)
const spendTime = ref(0)
const ansList = reactive({
    arr: [],
})
const ans = ref('')
const ansText = ref('')
const url = ref('')
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

function start() {
    spendTime.value = 0
    loading.value = true
    const nextList = lists.filter((e) => e.playlist !== nowplay.playlist)
    const a = Math.floor(Math.random() * nextList.length)
    const time = Math.floor(Math.random() * 60) + 1
    nowplay.playlist = nextList[a].playlist
    nowplay.start = randomTime.value ? String(time) : nextList[a].start
    nowplay.name = nextList[a].name
    nowplay.song = nextList[a].song
    var player
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
    // ansText.value = ''
    // ans.value = ''
    // show.value = true
    // spendTime.value = 0
    // loading.value = true
    // clearInterval(timer)
    // await player.destroy()
    // await start()
    window.location.reload()
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
    for (let i = 0; i < 3; i++) {
        const A = Math.floor(Math.random() * nextList.length)
        if (!ansList.arr.includes({ name: nextList[A].name, song: nextList[A].song })) {
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
        clearInterval(timer)
    } else {
        i.ans = 0
        ansText.value = '答錯了！！！'
    }
}
</script>

<template>
    <div class="w-full h-screen flex flex-col justify-center items-center bg-zinc-600 p-4">
        <div class="flex flex-col items-center space-y-4 w-full lg:w-[600px] bg-zinc-900 p-4 rounded-md">
            <div class="w-full flex justify-between items-center">
                <div class="flex items-center gap-2 text-sm">
                    <label for="timebtn" class="cursor-pointer" :class="randomTime ? 'text-white' : 'text-gray-300'"
                        >隨機時間模式</label
                    >
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
                </div>
                <p class="text-sm text-white">花費時間 {{ spendTime / 100 }}</p>
            </div>

            <h1 class="text-2xl font-bold text-white">KPOP隨機猜歌大賽</h1>

            <div class="relative">
                <!-- <iframe
                    id="video"
                    v-if="nowplay.playlist !== '' && nowplay.start !== ''"
                    class="w-[80vw] lg:w-[560px] h-[30vh] sm:h-[50vh] lg:h-[315px]"
                    :src="url"
                    title="player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                ></iframe> -->
                <div id="player" class="w-[80vw] lg:w-[560px] h-[30vh] sm:h-[50vh] lg:h-[315px]"></div>
                <h1 class="text-xl text-white font-bold mt-4">{{ nowplay.name }} - {{ nowplay.song }}</h1>
                <div
                    class="absolute z-50 top-0 left-0 text-white w-full h-full bg-gradient-to-br from-pink-500 to-rose-500 flex flex-col items-center justify-center text-xl"
                    v-show="show"
                >
                    <p>{{ loading ? '找歌中...' : '猜不猜的到拉？？' }}</p>
                    <p class="text-2xl font-bold mt-5">{{ ansText }}</p>
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
                    class="bg-gradient-to-br from-pink-500 to-rose-500 text-white w-32 lg:w-40 py-2 rounded-md shadow-lg shadow-rose-800 hover:from-pink-600 hover:to-rose-600 duration-300"
                    @click="nowplay.playlist == '' ? start() : next()"
                >
                    {{ nowplay.playlist == '' ? '開始' : '下一首' }}
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
