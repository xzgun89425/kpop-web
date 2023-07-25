<script lang="ts" setup>
const { lists } = useBandStore()
const show = ref(true)
const videoShow = ref(true)
const randomTime = ref(true)
const player = ref(null)
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
    const nextList = lists.filter((e) => e.playlist !== nowplay.playlist)
    const a = Math.floor(Math.random() * nextList.length)
    const time = Math.floor(Math.random() * 100) + 1
    nowplay.playlist = nextList[a].playlist
    nowplay.start = randomTime.value ? String(time) : nextList[a].start
    nowplay.name = nextList[a].name
    nowplay.song = nextList[a].song

    player.value = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: nowplay.playlist,
        events: {
            onReady: onPlayerReady,
        },
    })
}

async function next() {
    await player.value.destroy()
    await start()
}

function onPlayerReady(e) {
    e.target.setVolume(70)
    e.target.playVideo()
    e.target.loadVideoById({ videoId: nowplay.playlist, startSeconds: nowplay.start })
    // e.target.mute().playVideo()
}
// function onPlayerStateChange(e) {
//     e.target.setVolume(70)
//     e.target.playVideo()
//     e.target.loadVideoById({ videoId: nowplay.playlist, startSeconds: nowplay.start })
// }

function showAns() {
    show.value = !show.value
}

function changeFrom() {
    randomTime.value = !randomTime.value
}
</script>

<template>
    <div class="w-full h-screen flex justify-center items-center bg-zinc-600 p-4">
        <div class="flex flex-col items-center space-y-4 w-full lg:w-[600px] bg-zinc-900 p-4 rounded-md">
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
                    class="absolute z-50 top-0 left-0 text-white w-full h-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xl"
                    v-show="show"
                >
                    猜不猜的到拉？？
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
    </div>
</template>

<style scoped></style>
