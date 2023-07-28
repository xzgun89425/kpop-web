<script setup>
const router = useRouter()
const props = defineProps({
    total: {
        type: Number,
        default: 0,
    },
    timeTotal: {
        type: Number,
        default: 0,
    },
    qustime: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        default: '',
    },
    score: {
        type: Array,
        default: [],
    },
    mode: {
        type: String,
        default: '',
    },
    mistakeTime: {
        type: Number,
        default: 0,
    },
})

const level = ref('')
const scoreRules = computed(() => {
    switch (props.mode) {
        case 'all':
            return Math.round(props.total) >= 135
                ? `菁英`
                : Math.round(props.total) >= 100
                ? `大師`
                : Math.round(props.total) >= 75
                ? `金牌`
                : Math.round(props.total) >= 60
                ? `銀牌`
                : Math.round(props.total) >= 25
                ? `銅牌`
                : `菜雞`
        case 'time':
            return (props.timeTotal + props.mistakeTime) / 100 / props.qustime < 2.5
                ? `菁英`
                : (props.timeTotal + props.mistakeTime) / 100 / props.qustime < 3.5
                ? `大師`
                : (props.timeTotal + props.mistakeTime) / 100 / props.qustime < 4
                ? `金牌`
                : (props.timeTotal + props.mistakeTime) / 100 / props.qustime < 5
                ? `銀牌`
                : (props.timeTotal + props.mistakeTime) / 100 / props.qustime < 6
                ? `銅牌`
                : `菜雞`
        case 'normal':
            return props.total >= 95
                ? `菁英`
                : props.total >= 85
                ? `大師`
                : props.total >= 75
                ? `金牌`
                : props.total >= 65
                ? `銀牌`
                : props.total >= 20
                ? `銅牌`
                : `菜雞`
        default:
            break
    }
})

const sumSencond = computed(() => {
    const a = props.timeTotal + props.mistakeTime
    return (a / 100 / props.qustime).toFixed(2)
})

function sencondGoal(s) {
    if (s / 100 <= 2.5) {
        return 1.5
    } else if (s / 100 <= 4 && s / 100 > 2.5) {
        return 1
    } else if (s / 100 > 4) {
        return 0.8
    } else {
        return 0.5
    }
}

function print() {}

function reset() {
    router.go(0)
}
</script>

<template>
    <!-- ALL-->
    <div v-if="mode == 'all'">
        <p>
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
        <p>平均一題花了{{ (timeTotal / 100 / qustime).toFixed(2) }}秒</p>
        <p>總分為{{ Math.round(total) }}分</p>
    </div>
    <!-- Time -->
    <div class="w-full h-full flex flex-col items-center bg-white m-2 lg:m-4 pb-4 lg:pb-8">
        <p v-show="score.length == qustime" class="text-2xl lg:text-4xl text-primary my-4 font-semibold">
            {{ `你是${name}${scoreRules}` }}！
        </p>
        <div
            :class="mode == 'normal' ? 'items-center' : 'items-start'"
            class="w-full flex justify-between h-full p-4 text-sm lg:text-base"
        >
            <div class="text-gray-900">
                <h1 class="mb-2">答題記錄</h1>
                <ul v-if="mode == 'all'">
                    <li v-for="(i, idx) in score" :key="idx">
                        第{{ idx + 1 }}題：{{ i.time / 100 }}<span class="text-xs"> 秒</span> |
                        {{ Math.floor(i.value * sencondGoal(i.time)) }}<span class="text-xs"> 分 </span>
                        <span class="text-xs">({{ sencondGoal(i.time) }})</span>
                    </li>
                </ul>
                <ul v-if="mode == 'time'">
                    <li v-for="(i, idx) in score" :key="idx">
                        第{{ idx + 1 }}題：{{ i / 100 }}<span class="text-xs">秒</span>
                    </li>
                </ul>
                <ul v-if="mode == 'normal'">
                    <li v-for="(i, idx) in score" :key="idx">
                        第{{ idx + 1 }}題：{{ i }}<span class="text-xs">分</span>
                    </li>
                </ul>

                <div v-if="mode == 'all'" class="mt-2 border-t border-gray-400 pt-2">
                    總得分：{{ Math.round(total) }}分
                </div>
                <div v-if="mode == 'normal'" class="mt-2 border-t border-gray-400 pt-2">
                    總得分：{{ total }}<span class="text-xs">分</span>
                </div>
                <div v-if="mode == 'time'" class="mt-2 border-t border-gray-400 pt-2">
                    總秒數：{{ timeTotal / 100 }}
                    <span v-show="mistakeTime > 0" class="text-red-500"
                        >+{{ mistakeTime / 100 }}秒<span class="text-xs">(錯{{ mistakeTime / 200 }}次)</span></span
                    >
                </div>
            </div>
            <div
                class="flex flex-col w-1/2 h-full gap-4"
                :class="mode == 'normal' ? 'items-center justify-center' : 'items-end justify-between'"
            >
                <p v-show="score.length == qustime && mode !== 'normal'">平均 {{ sumSencond }}秒/題</p>
                <div class="bg-primary rounded-full p-4">
                    <div class="flex justify-center items-center rounded-full w-[100px] h-[100px] bg-white text-lg">
                        {{ scoreRules }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button @click="reset()" class="bg-white text-primary px-4 py-1 rounded mt-4 hover:bg-gray-100">再測一次</button>
</template>

<style></style>
