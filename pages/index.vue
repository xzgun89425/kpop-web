<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";

// const { data: group } = await useFetch("/api/idle");

const banners = reactive([
  {
    id: 1,
    title: "ITZY 7/31以Cake主打歌推出新專輯Kill my doubt強勢回歸！",
    content: "",
    img: "/img/banner/itzy.jpg",
    link: "https://www.youtube.com/watch?v=0bIRwBpBcZQ",
  },
  {
    id: 2,
    title: "NewJeans近日登上美國芝加哥舞台，lollapalooza嗨唱熱門單曲！",
    content: "",
    img: "/img/banner/newjeans.webp",
    link: "https://www.youtube.com/watch?v=AOoQHjpiwEQ",
  },
  {
    id: 3,
    title: "(G)-IDLE 女孩們與88rising合作新曲 I Do",
    content: "",
    img: "/img/banner/gidle-front.jpg",
    link: "https://www.youtube.com/watch?v=pCh3Kp6qxo8",
  },
]);

function golink(link) {
  window.open(link, "_blank");
}
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-center items-center bg-gray-200"
  >
    <div class="w-full max-w-[1440px] p-4">
      <Swiper
        :modules="[Pagination, Autoplay]"
        :pagination="{ clickable: true }"
        loop
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        class="mySwiper"
      >
        <SwiperSlide v-for="i in banners" :key="i.id">
          <div
            @click="golink(i.link)"
            class="w-full aspect-w-16 aspect-h-9 relative group cursor-pointer"
          >
            <img
              class="object-cover object-center group-hover:scale-110 duration-200"
              :src="i.img"
              alt=""
            />
            <div
              class="absolute w-ful h-full z-20 bg-black/40 text-white text-4xl font-bold flex justify-start items-end p-10"
            >
              <h1>{{ i.title }}</h1>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>

  <!-- <div class="w-full flex justify-center bg-gray-200">
    <div class="w-full max-w-[1440px] p-4">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="bg-white" v-for="i in group" :key="i">
          <div class="aspect-w-2 aspect-h-3">
            <img :src="i.img" alt="" class="object-cover object-center" />
          </div>
          <h1 class="text-xl p-4">
            {{ i.groupName }} - {{ i.name }} {{ i.name_ch }}
          </h1>
        </div>
      </div>
    </div>
  </div> -->
</template>

<style>
.swiper-pagination-bullet {
  width: 30px;
  height: 4px;
  border-radius: 0px;
  transition: width 0.3s;
  background: #fff;
}

.swiper-pagination-bullet-active {
  width: 40px;
  background: #0ea5e9;
}
</style>
