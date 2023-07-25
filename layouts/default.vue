<script lang="ts" setup></script>

<template>
    <div>
        <!-- <header class="bg-zinc-900 w-full text-white flex justify-between items-center h-16 px-10">
            <h1>LOGO</h1>
            <ul class="flex items-center gap-4">
                <li class="p-3 border-b-2 border-white/0 duration-200 hover:border-white">
                    <NuxtLink to="/">All Group</NuxtLink>
                </li>
                <li class="p-3 border-b-2 border-white/0 duration-200 hover:border-white">
                    <NuxtLink to="/">Song Test</NuxtLink>
                </li>
                <li class="p-3 border-b-2 border-white/0 duration-200 hover:border-white">
                    <NuxtLink to="/">Member</NuxtLink>
                </li>
            </ul>
        </header> -->
        <slot />
        <footer></footer>
    </div>
</template>

<style scoped></style>
