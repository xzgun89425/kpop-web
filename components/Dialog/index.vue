<script setup lang="ts">
import { dialogData, useDialog } from "@/composables/useDialog";
const dialog = useDialog();

interface Props {
  customClass?: string;
  cancelBtnClass?: string;
  confirmBtnClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  customClass: "",
  cancelBtnClass: "bg-red-500",
  confirmBtnClass: "bg-green-500",
});
</script>

<template>
  <dialog id="dialog" class="p-4" :class="customClass">
    <header class="text-center">{{ dialogData.title }}</header>
    <main class="my-4">{{ dialogData.content }}</main>
    <footer class="w-full flex items-center gap-4">
      <button
        :class="cancelBtnClass"
        class="flex-1 py-2 rounded text-white duration-200"
        @click="dialog.close('cancel')"
      >
        {{ dialogData.cancel.btnName }}
      </button>
      <button
        :class="confirmBtnClass"
        class="flex-1 py-2 rounded text-white duration-200"
        @click="dialog.close('confirm')"
      >
        {{ dialogData.confirm.btnName }}
      </button>
    </footer>
  </dialog>
</template>

<style>
</style>