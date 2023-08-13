<script lang="ts" setup></script>

<template>
  <NuxtLoadingIndicator color="#67e8f9" :height="5" :throttle="0" />
  <div class="bg-gray-100 NotoSansTC">
    <header
      class="bg-gradient-to-br from-sky-500 to-cyan-500 w-full text-white flex justify-between items-center h-16 px-4 lg:px-10 sticky top-0 left-0 z-50"
    >
      <NuxtLink to="/">
        <img src="/img/kelywhy.png" class="h-4 lg:h-8" alt="" />
      </NuxtLink>
      <ul class="text-base lg:text-lg flex items-center gap-4">
        <li
          class="p-2 border-b-2 border-white/0 duration-200 hover:border-white"
        >
          <NuxtLink to="/">首頁</NuxtLink>
        </li>
        <li
          class="p-2 border-b-2 border-white/0 duration-200 hover:border-white"
        >
          <NuxtLink to="/competition">小測驗</NuxtLink>
        </li>
        <li
          class="p-2 border-b-2 border-white/0 duration-200 hover:border-white"
        >
          <NuxtLink to="/learn">學習資料</NuxtLink>
        </li>
      </ul>
    </header>
    <slot />
    <footer></footer>
  </div>
</template>

<style scoped></style>
