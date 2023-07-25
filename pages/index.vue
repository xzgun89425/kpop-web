<script lang="ts" setup>
const { lists } = useBandStore()
const show = ref(false)
const randomTime = ref(true)
const nowplay = reactive({
    playlist: '',
    start: '',
    name: '',
    song: '',
})

function start() {
    show.value = false
    const nextList = lists.filter((e) => e.playlist !== nowplay.playlist)
    const a = Math.floor(Math.random() * nextList.length)
    const time = Math.floor(Math.random() * 100) + 1
    nowplay.playlist = nextList[a].playlist
    nowplay.start = randomTime.value ? String(time) : nextList[a].start
    nowplay.name = nextList[a].name
    nowplay.song = nextList[a].song
}

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

            <div :class="show ? 'block' : 'hidden'">
                <iframe
                    v-if="nowplay.playlist !== '' && nowplay.start !== ''"
                    class="w-[80vw] lg:w-[560px] h-[30vh] sm:h-[50vh] lg:h-[315px]"
                    :src="`https://www.youtube.com/embed/${nowplay.playlist}?start=${nowplay.start}&rel=0&autoplay=1&loop=1&playlist=${nowplay.playlist}`"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                ></iframe>
                <h1 class="text-xl text-white font-bold mt-4">{{ nowplay.name }} - {{ nowplay.song }}</h1>
            </div>

            <div class="flex justify-between items-center gap-4">
                <button
                    v-if="nowplay.playlist !== '' && nowplay.start !== ''"
                    class="bg-gradient-to-br from-pink-500 to-rose-500 text-white w-32 lg:w-40 py-2 rounded-md shadow-lg shadow-rose-800 hover:from-pink-600 hover:to-rose-600 duration-300"
                    @click="showAns()"
                >
                    {{ show ? '隱藏' : '看答案' }}
                </button>
                <button
                    class="bg-gradient-to-br from-pink-500 to-rose-500 text-white w-32 lg:w-40 py-2 rounded-md shadow-lg shadow-rose-800 hover:from-pink-600 hover:to-rose-600 duration-300"
                    @click="start()"
                >
                    {{ nowplay.playlist !== '' ? '下一首' : '開始' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
