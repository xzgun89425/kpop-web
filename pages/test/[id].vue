<script setup>
const route = useRoute()
const { testlist } = useTestStore()
const lists = reactive({ arr: [] })
const title = ref('')
const name = ref('')
const loading = ref(true)
const { data } = await useFetch(`/api/${route.params.id}`)
lists.arr = data.value.data[0].SongList
onMounted(async () => {
    await init()

    loading.value = false
})

function init() {
    const a = testlist.filter((e) => e.id == route.params.id)
    title.value = a[0].title
    name.value = a[0].name
}
</script>

<template>
    <SongTest v-if="!loading" :lists="lists.arr" :title="title" :name="name"></SongTest>
</template>

<style></style>
