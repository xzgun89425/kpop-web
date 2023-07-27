<script setup>
const router = useRouter()
const devices = reactive([
    { device: 'desktop', text: '建議電腦' },
    { device: 'mobile', text: '建議手機' },
    { device: 'both', text: '無限制' },
])
const list = reactive([
    {
        id: 1,
        name: '2023韓國K-POP女團猜歌測驗',
        img: '/img/female/karina.jpg',
        src: 'song',
        detail: '測驗聽到歌曲後你能多快選出正確的歌曲名稱及團體，考驗平時的學習量。依照題數及總時間去計算平均每題的猜題時間，得出你是女團博士還是碩士！',
        device: 'desktop',
        level: '易',
    },
    {
        id: 2,
        name: '2023韓國K-POP猜歌測驗(南韓百大熱門+韓國流行樂大集合)',
        img: '/img/female/winter.jpg',
        src: 'songhard',
        detail: '測驗聽到歌曲後你能多快選出正確的歌曲名稱及團體，考驗平時的學習量。依照題數及總時間去計算平均每題的猜題時間，得出你是女團博士還是碩士！',
        device: 'desktop',
        level: '難',
    },
    {
        id: 3,
        name: '周杰倫猜歌測驗',
        img: '/img/male/jaychou.png',
        src: 'jaychou',
        detail: '測驗聽到歌曲後你能多快選出正確的歌曲名稱，考驗平時的學習量。依照題數及總時間去計算平均每題的猜題時間，得出你是周博士還是周碩士！',
        device: 'desktop',
        level: '難',
    },
    // {
    //     id: 2,
    //     name: '2023韓國K-POP女團認臉測驗',
    //     src: 'img',
    //     detail: '測驗看到照片後你能多快選出正確的答案，考驗平時的閱讀量。依照題數及總時間去計算平均每題的猜題時間，得出你是女團博士還是碩士！',
    //     device: 'both',
    // },
    // {
    //     id: 1,
    //     name: '2023韓國K-POP女團辨識測驗',
    //     src: 'song',
    //     detail: '測驗聽到歌曲後你能多快選出正確的歌曲名稱及團體，考驗平時的學習量。依照題數及總時間去計算平均每題的猜題時間，得出你是女團博士還是碩士！',
    // },
])

function goPage(src) {
    router.push(`/test/${src}`)
}
</script>

<template>
    <div class="w-full h-screen bg-zinc-600 flex flex-col items-center justify-start">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 max-w-7xl w-full">
            <div
                v-for="i in list"
                :key="i.id"
                class="col-span-1 bg-zinc-900 h-auto p-4 rounded-md relative flex flex-col justify-between"
            >
                <span
                    v-for="(item, idx) in devices"
                    :key="idx"
                    v-show="item.device == i.device"
                    class="absolute -top-2 left-[calc(50%-40px)] bg-pink-500 text-white text-sm px-3 rounded-full"
                    >{{ item.text }}</span
                >
                <span
                    :class="i.level == '易' ? 'bg-green-500' : i.level == '中' ? 'bg-amber-500' : 'bg-red-500'"
                    class="absolute -top-2 -left-2 z-30 text-white rounded-full text-lg font-bold w-10 h-10 flex justify-center items-center"
                    >{{ i.level }}</span
                >
                <div>
                    <div class="w-full h-40 md:h-60 flex justify-center items-center relative">
                        <img :src="i.img" class="w-full h-full object-cover" alt="" />
                        <p v-show="i.src == 'jaychou'" class="absolute bottom-4 text-white font-bold text-xl">
                            吵甚麼吵，賴清德
                        </p>
                    </div>
                    <h1 class="text-white text-xl font-bold my-4 h-14 overflow-hidden">{{ i.name }}</h1>
                    <p class="text-gray-400 text-sm truncate">{{ i.detail }}</p>
                </div>
                <div class="text-right w-full mt-4">
                    <button
                        @click="goPage(i.src)"
                        class="bg-gradient-to-br from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 duration-200 rounded-md w-full md:w-40 py-2"
                    >
                        測驗去
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
