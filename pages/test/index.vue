<script setup>
const router = useRouter()
const devices = reactive([
    { device: 'desktop', text: '建議電腦' },
    { device: 'mobile', text: '建議手機' },
    { device: 'both', text: '無限制' },
])
const { testlist } = useTestStore()

function goPage(src) {
    router.push(`/test/${src}`)
}
</script>

<template>
    <div class="w-full bg-gray-100 flex flex-col items-center justify-start">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 p-8 max-w-7xl w-full">
            <div
                v-for="i in testlist"
                :key="i.id"
                class="col-span-1 bg-white h-auto p-4 rounded-md relative flex flex-col justify-between shadow-md shadow-gray-300"
            >
                <span
                    v-for="(item, idx) in devices"
                    :key="idx"
                    v-show="item.device == i.device"
                    class="absolute -top-4 left-[calc(50%-40px)] bg-primary text-white text-sm px-3 py-1 rounded-full shadow-md shadow-gray-300"
                    >{{ item.text }}</span
                >
                <!-- <span
                    :class="i.level == '易' ? 'bg-green-500' : i.level == '中' ? 'bg-amber-500' : 'bg-red-500'"
                    class="absolute -top-2 -left-2 z-30 text-white rounded-full text-lg font-bold w-10 h-10 flex justify-center items-center shadow-md shadow-gray-300"
                    >{{ i.level }}</span
                > -->
                <div>
                    <div class="aspect-w-4 aspect-h-4 flex justify-center items-center relative">
                        <img :src="`/img/${i.img}`" class="w-full h-full object-cover" alt="" />
                        <p v-show="i.id == 'jaychou'" class="absolute bottom-0 text-white font-bold text-xl">
                            吵甚麼吵，賴清德
                        </p>
                    </div>
                    <h1 class="text-gray-900 text-xl font-bold my-4 h-14 overflow-hidden">{{ i.testName }}</h1>
                    <p class="text-gray-500 text-sm truncate">{{ i.detail }}</p>
                </div>
                <div class="text-right w-full mt-4">
                    <button
                        @click="goPage(i.id)"
                        class="bg-primary text-white hover:bg-primaryHover duration-200 rounded-md w-full py-2"
                    >
                        測驗去
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
