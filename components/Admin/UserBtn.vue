<script lang="ts" setup>
const open = ref(false);

function show() {
  open.value = !open.value;
}
</script>

<template>
  <div>
    <button @click="show" class="px-4 flex items-center gap-4 relative">
      <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
      KAI
      <SvgIcon name="icon-caret-down" class="w-5 h-5"></SvgIcon>

      <ul
        v-show="open"
        class="absolute w-full bg-white top-[50px] left-0 shadow shadow-gray-400 divide-y divide-gray-300 rounded"
      >
        <li class="flex justify-start items-center gap-2 px-2 py-2">
          <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div class="text-start">
            <p>KAI</p>
            <p class="text-sm text-gray-500">管理員</p>
          </div>
        </li>
        <li
          class="py-3 px-4 text-sm text-start hover:bg-gray-300 flex items-center gap-2"
        >
          <SvgIcon
            name="sidebar/icon-gear"
            class="w-5 h-5"
            color="#374151"
          ></SvgIcon
          >設定
        </li>
        <li
          class="py-3 px-4 text-sm text-start hover:bg-gray-300 flex items-center gap-2"
        >
          <SvgIcon name="icon-logout" class="w-5 h-5" color="#374151"></SvgIcon
          >登出
        </li>
      </ul>
    </button>
  </div>
</template>

<style scoped></style>
