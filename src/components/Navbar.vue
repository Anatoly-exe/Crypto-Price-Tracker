<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const emit = defineEmits(["toggle-search"]);

const toggleSearch = () => {
  if (route.path !== "/") {
    router.push("/");

    setTimeout(() => {
      emit("toggle-search");
    }, 100);
  } else {
    emit("toggle-search");
  }
};

const navigateToFavorites = () => {
  router.push("/favorites");
};

const navigateToHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="fixed left-0 bottom-0 top-0 bg-[#161618] w-64">
    <div
      @click="navigateToHome"
      class="p-4 flex items-center cursor-pointer hover:bg-gray-700 transition-colors"
    >
      <img
        src="/photos/logo.png"
        alt="Crypto Tracker Logo"
        class="w-15 h-15 rounded-lg"
      />
      <span class="text-white font-semibold ml-3">Crypto Tracker</span>
    </div>

    <div class="p-4 space-y-2">
      <button
        @click="toggleSearch"
        class="flex items-center space-x-3 w-full p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
      >
        <img src="/photos/search.svg" alt="Search Icon" class="w-5 h-5" />
        <span>Поиск</span>
      </button>

      <button
        @click="navigateToFavorites"
        class="flex items-center space-x-3 w-full p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
      >
        <span>⭐</span>
        <span>Избранное</span>
      </button>
    </div>
  </div>
</template>
