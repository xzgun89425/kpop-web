<script setup>
const { lists } = useFemaleStore()
const ansList = reactive({ arr: [] })
const startState = ref(false)

function start() {
    ansList.arr = lists.sort(() => Math.random() - 0.5)
    startState.value = true
}
</script>

<template>
    <div class="w-full h-screen bg-zinc-600 flex items-center justify-center">
        <div class="w-full lg:w-[600px] bg-zinc-900 p-4 rounded-md">
            <button
                v-show="!startState"
                @click="start()"
                class="w-40 bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-md py-2 text-white"
            >
                開始
            </button>
            <div v-show="startState">
                <img src="/img/female/karina.jpg" class="w-full object-cover object-center" alt="" />
            </div>
            <div class="w-full flex items-center justify-between gap-2 text-white mt-4">
                <button
                    v-for="(i, idx) in ansList.arr"
                    :key="idx"
                    class="flex-1 bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-md py-2"
                >
                    {{ i.name }}
                </button>
            </div>
        </div>
    </div>
</template>

<style></style>
