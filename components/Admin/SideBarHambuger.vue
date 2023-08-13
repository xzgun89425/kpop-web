<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="space-y-1">
    <div class="w-7 h-[3px] bg-zinc-600 rounded"></div>
    <div class="w-7 h-[3px] bg-zinc-600 rounded"></div>
    <div
      :class="open ? 'w-5' : 'w-7'"
      class="h-[3px] bg-zinc-600 rounded duration-200"
    ></div>
  </div>
</template>

<style></style>
