<script setup>
const route = useRoute();
const event = useRequestEvent();
setResponseStatus(event, 404);
</script>

<template>
  <div
    class="w-full h-[calc(100vh-64px)] flex flex-col justify-center items-center"
  >
    <h1 class="text-4xl">404 Not Found</h1>
  </div>
</template>

<style>
</style>