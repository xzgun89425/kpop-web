<script setup>
definePageMeta({
  layout: "login",
});
// const { data: memberList } = await useFetch("/api/member");

const members = reactive({
  account: "",
  password: "",
});

const resetMember = () => {
  members.account = "";
  members.password = "";
};

const createMember = async () => {
  // const res = await $fetch("/api/admin/login", {
  //   method: "POST",
  //   body: {
  //     account: members.account,
  //     password: members.password,
  //   },
  // });
  // console.log(res);
};
</script>

<template>
  <div class="w-screen flex justify-center items-center h-screen">
    <div class="w-full max-w-[600px] bg-white p-5 shadow shadow-gray-400">
      <h1 class="text-center text-2xl text-black font-bold">後臺管理系統</h1>
      <form class="px-10 my-6 space-y-4" @submit.prevent="createMember">
        <div class="flex gap-4 justify-between items-center">
          <label for="name" class="">帳號</label>
          <input
            type="text"
            name="name"
            id="name"
            class="flex-1 border border-gray-200 p-2 outline-none focus:ring focus:ring-primary rounded"
            v-model="members.account"
          />
        </div>
        <div class="flex gap-4 justify-between items-center">
          <label for="pwd" class="">密碼</label>
          <input
            type="password"
            name="pwd"
            id="pwd"
            class="flex-1 border border-gray-200 p-2 outline-none focus:ring focus:ring-primary rounded"
            v-model="members.password"
          />
        </div>
        <button
          class="bg-primary text-white hover:bg-primaryHover w-full py-2 rounded"
        >
          登入
        </button>
      </form>
    </div>
  </div>
</template>

<style>
</style>