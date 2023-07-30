<script setup>
onMounted(() => {
    init()
})
function init() {
    var tag = document.createElement('script')

    tag.src = 'https://www.youtube.com/iframe_api'
    var firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
}
var player
function start() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    })
}
function onPlayerReady(e) {
    e.target.mute()
    e.target.setVolume(90)
    e.target.playVideo()
    e.target.loadVideoById({ videoId: 'rweaQGkq0-E', startSeconds: 1 })
}
function onPlayerStateChange(e) {
    if (e.data == -1) {
    } else if (e.data == 0) {
    } else if (e.data == 1) {
        if (e.target.isMuted()) {
            e.target.unMute()
            e.target.setVolume(100)
        }
    } else if (e.data == 2) {
    } else if (e.data == 3) {
    } else if (e.data == 5) {
    }
}

function play() {
    player.playVideo()
}
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center bg-gray-200">
        <div class="text-gray-900 text-3xl">
            首頁 還在建置中．．．<br />可以先前往<NuxtLink to="/competition" class="text-sky-500 hover:text-sky-400"
                >小測驗</NuxtLink
            >玩耍
        </div>
        <button @click="play()">play</button>
        <button @click="start()">看萌獸</button>
        <div class="aspect-w-16 aspect-h-9 w-full">
            <div id="player"></div>
        </div>
    </div>
</template>

<style></style>
