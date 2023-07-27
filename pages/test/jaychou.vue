<script setup>
import file from '~/json/jaychou.json'
const listsHard = file[0].SongList
const title = ref('周杰倫')
const name = ref('周')
</script>

<template>
    <SongTest :lists="listsHard" :title="title" :name="name"></SongTest>
</template>

<style></style>
