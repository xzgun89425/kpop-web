<script setup>
import file from '~/json/kpopTop100.json'
const listsHard = file[0].SongList
const title = ref('KPOP')
const name = ref('女團')
</script>

<template>
    <SongTest :lists="listsHard" :title="title" :name="name"></SongTest>
</template>

<style></style>
