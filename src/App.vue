<script setup>
import { ref, provide } from "vue";
import Navbar from "./components/Navbar.vue";

const showSearch = ref(false);

const handleToggleSearch = () => {
  showSearch.value = !showSearch.value;
};

provide("showSearch", showSearch);
provide("handleToggleSearch", handleToggleSearch);
</script>

<template>
  <div class="min-h-screen bg-[#202027]">
    <Navbar @toggle-search="handleToggleSearch" />
    <router-view />
  </div>
</template>
