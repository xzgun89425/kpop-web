<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const sideList = reactive([
  {
    name: "儀錶板",
    path: "/",
    icon: "sidebar/icon-grid",
    show: false,
    children: [],
  },
  {
    name: "商品",
    path: "/",
    icon: "sidebar/icon-cart",
    show: false,
    children: [],
  },
  {
    name: "會員",
    path: "/",
    icon: "sidebar/icon-users",
    show: false,
    children: [],
  },
  {
    name: "網站設定",
    path: "/",
    icon: "sidebar/icon-desktop",
    show: false,
    children: [],
  },
  {
    name: "管理設定",
    path: "/",
    icon: "sidebar/icon-address-setting",
    show: false,
    children: [
      {
        name: "管理員",
        path: "/",
        icon: "sidebar/icon-address-tie",
        children: [],
      },
      {
        name: "角色",
        path: "/",
        icon: "sidebar/icon-address-book",
        children: [],
      },
      {
        name: "權限",
        path: "/",
        icon: "sidebar/icon-address-card",
        children: [],
      },
    ],
  },
  {
    name: "訂單",
    path: "/",
    icon: "sidebar/icon-order",
    show: false,
    children: [],
  },
  {
    name: "系統",
    path: "/",
    icon: "sidebar/icon-gear",
    show: false,
    children: [],
  },
]);

function showChildren(i) {
  i.show = !i.show;
}
</script>

<template>
  <div
    :class="open ? 'w-48' : 'w-0'"
    class="overflow-hidden bg-primary duration-200 fixed top-0 left-0 lg:relative text-white h-screen flex flex-col overflow-y-auto noscrollbar"
  >
    <div class="p-4">
      <NuxtLink to="/" class="">
        <img src="/img/kelywhy.png" class="h-4 lg:h-8" alt="" />
      </NuxtLink>
    </div>
    <div v-for="i in sideList" :key="i.path">
      <NuxtLink
        v-if="i.children.length == 0"
        :to="i.path"
        class="w-full text-start"
      >
        <div
          class="flex items-center hover:bg-primaryHover cursor-pointer gap-4 w-full py-3 px-4 whitespace-nowrap"
        >
          <SvgIcon :name="i.icon" class="w-5 h-5" color="#fff"></SvgIcon>
          {{ i.name }}
        </div>
      </NuxtLink>
      <button
        v-else
        @click="showChildren(i)"
        class="w-full text-start whitespace-nowrap"
      >
        <div
          class="flex justify-between items-center hover:bg-primaryHover py-3 px-4"
        >
          <div class="flex items-center gap-4">
            <SvgIcon :name="i.icon" class="w-5 h-5" color="#fff"></SvgIcon>
            {{ i.name }}
          </div>
          <div v-show="open">
            <SvgIcon
              v-show="i.children.length > 0"
              name="icon-angleRight"
              class="w-5 h-5 duration-200"
              :class="i.show ? 'rotate-90' : ''"
              color="#fff"
            ></SvgIcon>
          </div>
        </div>
        <div
          :class="i.show ? 'block' : 'hidden'"
          class="duration-200 flex flex-col overflow-hidden"
        >
          <NuxtLink
            :to="i.path"
            v-for="item in i.children"
            :key="item.path"
            class="py-3 text-start pl-8 w-full hover:bg-primaryHover"
          >
            <div class="flex items-center gap-4">
              <SvgIcon :name="item.icon" class="w-5 h-5" color="#fff"></SvgIcon>
              {{ item.name }}
            </div>
          </NuxtLink>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.noscrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.noscrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
