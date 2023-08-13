<script setup>
definePageMeta({
  layout: "admin",
});
const dialog = useDialog();

function openDialog() {
  dialog.open({
    content: "就跟你說是內文了",
    confirm: {},
    cancel: {},
  });
}
</script>

<template>
  <button @click="openDialog">OPEN</button>
</template>

<style>
</style>