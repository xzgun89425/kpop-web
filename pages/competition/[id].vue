<script setup>
const route = useRoute()
const { testlist } = useTestStore()
const lists = reactive({ arr: [] })
const title = ref('')
const name = ref('')
const step = ref(1)
const mode = ref('')
const loading = ref(true)

const { data } = await useFetch(`/api/${route.params.id}`)
lists.arr = data.value.data[0].SongList

const rules = reactive([
    {
        name: 'time',
        rule: '答題選錯一次，答題總時數會加2秒。',
        score: '(每題答題時間的總和 / 題數)',
        top: '小於2.5秒',
        master: '2.5 ~ 3秒',
        gold: '3 ~ 4秒',
        sliver: '4 ~ 5秒',
        copper: '5 ~ 6秒',
        newguy: '大於6秒',
    },
    {
        name: 'normal',
        rule: '題數固定10題，答錯不倒扣。',
        score: '第一次答對:10分<br/>第二次答對:7分<br/>第三次答對:4分<br/>第四次答對:1分<br/>每題得分加總，滿分100',
        top: '95分以上',
        master: '85分以上',
        gold: '75分以上',
        sliver: '60分以上',
        copper: '20分以上',
        newguy: '低於20分',
    },
    {
        name: 'all',
        rule: '題數固定10題，答錯分數不倒扣。',
        score: '第一次答對:10分<br/>第二次答對:7分<br/>第三次答對:4分<br/>第四次答對:1分<br/>--------------<br/>2.5秒內答對:分數*1.5<br/>4秒內答對:分數*1<br/>4秒以上答對:分數*0.8<br/>(該題得分 * 該題秒數的加權指數) = 總得分',
        top: '135分以上',
        master: '100分以上',
        gold: '75分以上',
        sliver: '60分以上',
        copper: '25分以上',
        newguy: '低於25分',
    },
])

onMounted(async () => {
    await init()

    loading.value = false
})

function init() {
    const a = testlist.filter((e) => e.id == route.params.id)
    title.value = data.value.data[0].ListName
    name.value = a[0].name
}

function setStep(value) {
    step.value += value
}

function chooseMode(value) {
    mode.value = value
    setStep(1)
}
</script>

<template>
    <div v-if="step !== 3" class="w-full flex justify-center bg-gray-200 py-4 lg:py-8 px-4 lg:px-0">
        <h1 class="text-2xl font-bold text-gray-900">{{ title }}猜歌測驗 暫停測試</h1>
    </div>
    <div v-show="step == 1" class="w-full flex justify-center items-start bg-gray-200 py-4 lg:py-8 px-4 lg:px-0">
        <div class="w-full max-w-[800px] flex flex-col lg:flex-row items-center justify-start lg:justify-between gap-4">
            <div
                @click="chooseMode('time')"
                class="bg-primary hover:bg-primaryHover cursor-pointer duration-200 shadow shadow-gray-500 w-full flex-1 flex flex-col justify-center items-center h-60 py-10 lg:py-20 rounded"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 fill-white mb-4" viewBox="0 0 512 512">
                    <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                    />
                </svg>
                <h1 class="text-white text-xl">秒數競賽</h1>
            </div>
            <div
                @click="chooseMode('normal')"
                class="bg-primary hover:bg-primaryHover cursor-pointer duration-200 shadow shadow-gray-500 w-full flex-1 flex flex-col justify-center items-center h-60 py-10 lg:py-20 rounded"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 fill-white mb-4" viewBox="0 0 640 512">
                    <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"
                    />
                </svg>
                <h1 class="text-white text-xl">一般模式</h1>
            </div>
            <div
                @click="chooseMode('all')"
                class="bg-primary hover:bg-primaryHover cursor-pointer duration-200 shadow shadow-gray-500 w-full flex-1 flex flex-col justify-center items-center h-60 py-10 lg:py-20 rounded"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 fill-white mb-4" viewBox="0 0 576 512">
                    <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    />
                </svg>
                <h1 class="text-white text-xl">綜合評測</h1>
            </div>
        </div>
    </div>
    <div
        v-show="step == 2 && i.name == mode"
        v-for="i in rules"
        :key="i.name"
        class="w-full flex flex-col items-center justify-center py-8 bg-gray-200"
    >
        <div class="bg-white w-full max-w-[800px] p-4 rounded shadow shadow-gray-400">
            <p class="text-red-500 text-xl font-bold">注意：{{ i.rule }}</p>
            <div class="w-full justify-between items-start flex py-8">
                <p class="text-base text-gray-800">評分機制：<br /><span v-html="i.score"></span><br /></p>
                <p>
                    菁英：{{ i.top }}<br />
                    大師：{{ i.master }}<br />
                    金牌：{{ i.gold }}<br />
                    銀牌：{{ i.sliver }}<br />
                    銅牌：{{ i.copper }}<br />
                    菜雞：{{ i.newguy }}
                </p>
            </div>
        </div>
    </div>
    <div v-if="step == 2" class="w-full flex justify-center bg-gray-200 py-8 px-4 lg:px-0">
        <div class="w-full max-w-[800px] flex items-center justify-between gap-4">
            <button @click="setStep(-1)" class="bg-primary hover:bg-primaryHover text-white w-full rounded py-2">
                上一步
            </button>
            <button @click="setStep(1)" class="bg-primary hover:bg-primaryHover text-white w-full rounded py-2">
                我瞭解了
            </button>
        </div>
    </div>
    <Song v-if="!loading && step == 3" :mode="mode" :lists="lists.arr" :title="title" :name="name"></Song>
</template>

<style></style>
