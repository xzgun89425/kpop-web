<script setup>
const route = useRoute()
const { testlist } = useTestStore()
const lists = reactive({ arr: [] })
const title = ref('')
const name = ref('')
const step = ref(1)
const loading = ref(true)
const { data } = await useFetch(`/api/${route.params.id}`)
lists.arr = data.value.data[0].SongList
onMounted(async () => {
    await init()

    loading.value = false
})

function init() {
    const a = testlist.filter((e) => e.id == route.params.id)
    title.value = data.value.data[0].ListName
    name.value = a[0].name
}

function nextStep() {
    step.value++
}
</script>

<template>
    <div v-show="step == 1" class="w-full flex flex-col items-center justify-center py-8">
        <div class="bg-white w-full max-w-[800px] p-4 rounded">
            <p class="text-red-500 text-xl font-bold">注意：答題選錯一次，答題總時數會加1秒。</p>
            <p class="text-base text-gray-800 my-4">
                評分機制：(每題答題時間的總和 / 題數)<br />
                神：小於2秒<br />
                {{ name }}博士：2 ~ 2.5秒<br />
                {{ name }}碩士：2.5 ~ 3.5秒<br />
                {{ name }}大學生：3.5 ~ 4秒 <br />
                再練練：大於4秒
            </p>
            <button @click="nextStep()" class="bg-primary hover:bg-primaryHover text-white w-full rounded py-2">
                我瞭解了
            </button>
        </div>
    </div>
    <SongTest v-if="!loading && step == 2" :lists="lists.arr" :title="title" :name="name"></SongTest>
</template>

<style></style>
