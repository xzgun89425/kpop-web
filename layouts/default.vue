<script lang="ts" setup></script>

<template>
    <div>
        <header
            class="bg-zinc-900 w-full text-white flex justify-between items-center h-16 px-10 sticky top-0 left-0 z-50"
        >
            <h1>KPOP</h1>
            <ul class="flex items-center gap-4">
                <li class="p-3 border-b-2 border-white/0 duration-200 hover:border-white">
                    <NuxtLink to="/">首頁</NuxtLink>
                </li>
                <li class="p-3 border-b-2 border-white/0 duration-200 hover:border-white">
                    <NuxtLink to="/test">小測驗</NuxtLink>
                </li>
                <li class="p-3 border-b-2 border-white/0 duration-200 hover:border-white">
                    <NuxtLink to="/learn">學習資料</NuxtLink>
                </li>
            </ul>
        </header>
        <slot />
        <footer></footer>
    </div>
</template>

<style scoped></style>
