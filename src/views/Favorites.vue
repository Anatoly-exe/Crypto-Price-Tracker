<script setup>
import CryptoCard from "../components/CryptoCard.vue";
import { useFavorites } from "../composables/useFavorites";

const { favoriteCryptos, toggleFavorite } = useFavorites();
</script>

<template>
  <div class="ml-64 p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white">Избранные криптовалюты</h1>
      <p class="text-gray-400 mt-2">
        {{ favoriteCryptos.length }} монет в избранном
      </p>
    </div>

    <div v-if="favoriteCryptos.length > 0" class="space-y-4">
      <CryptoCard
        v-for="crypto in favoriteCryptos"
        :key="crypto.id"
        :crypto="crypto"
        :is-favorite="true"
        @toggle-favorite="() => toggleFavorite(crypto)"
      />
    </div>

    <div v-else class="text-center text-gray-400 py-16">
      <p class="text-xl">😔 В избранном пока ничего нет</p>
      <p class="mt-2">
        Добавляйте криптовалюты в избранное на главной странице
      </p>
    </div>
  </div>
</template>
