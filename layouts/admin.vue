<script lang="ts" setup>
import "virtual:svg-icons-register";
const open = ref(true);

function showSideBar() {
  open.value = !open.value;
}
</script>

<template>
  <div>
    <Dialog
      customClass="w-[80%] max-w-[600px]"
      cancelBtnClass="bg-rose-500 hover:bg-rose-600"
      confirmBtnClass="bg-primary hover:bg-primaryHover"
    ></Dialog>
    <div class="flex">
      <AdminSideBar :open="open"></AdminSideBar>
      <div class="flex-1 relative">
        <div
          class="sticky w-full h-14 bg-white border-b border-gray-300 flex justify-between items-center px-4"
        >
          <button @click="showSideBar()">
            <AdminSideBarHambuger :open="open"></AdminSideBarHambuger>
          </button>

          <div class="flex items-center divide-x divide-gray-300 gap-2">
            <button
              class="rounded-full w-10 h-10 flex justify-center items-center hover:bg-gray-200"
            >
              <SvgIcon name="icon-bell" class="w-5 h-5"></SvgIcon>
            </button>
            <AdminUserBtn></AdminUserBtn>
          </div>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
