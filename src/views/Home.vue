<script setup>
import { ref, computed, onMounted, inject } from "vue";
import axios from "axios";
import CryptoCard from "../components/CryptoCard.vue";
import { useFavorites } from "../composables/useFavorites";

const showSearch = inject("showSearch");
const handleToggleSearch = inject("handleToggleSearch");
const cryptocurrencies = ref([]);
const loading = ref(false);
const error = ref(null);
const searchQuery = ref("");

const { favoriteCryptos, toggleFavorite } = useFavorites();

onMounted(() => {
  fetchCryptoData();
});

const fetchCryptoData = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
    );
    cryptocurrencies.value = response.data;
  } catch (err) {
    error.value = "Не удалось загрузить данные: " + err.message;
    console.error("Ошибка API:", err);
  } finally {
    loading.value = false;
  }
};

const filteredCryptocurrencies = computed(() => {
  if (!searchQuery.value) {
    return cryptocurrencies.value;
  }

  const query = searchQuery.value.toLowerCase();
  return cryptocurrencies.value.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(query) ||
      crypto.symbol.toLowerCase().includes(query)
  );
});
</script>

<template>
  <div class="ml-64 p-6">
    <div
      v-if="showSearch"
      class="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700"
    >
      <h1 class="text-3xl font-bold text-white">Поиск</h1>
      <div class="relative">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Введите название или символ криптовалюты..."
          class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          autofocus
        />
        <img
          src="/photos/search.svg"
          alt="Search"
          class="absolute right-3 top-3 w-5 h-5"
        />
      </div>

      <div v-if="!searchQuery" class="flex space-x-2 mt-3">
        <button
          v-for="symbol in ['BTC', 'ETH', 'SOL', 'ADA']"
          :key="symbol"
          @click="searchQuery = symbol"
          class="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600 transition-colors"
        >
          {{ symbol }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-white text-center py-8">
      ⏳ Загрузка данных...
    </div>

    <div v-if="error" class="text-red-400 text-center py-8">❌ {{ error }}</div>

    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white">Список криптовалют</h1>
      <p class="text-gray-400 mt-2">
        {{
          searchQuery
            ? `Найдено: ${filteredCryptocurrencies.length}`
            : "Топ-50 по рыночной капитализации"
        }}
      </p>
    </div>

    <div v-if="!loading && !error" class="space-y-4">
      <CryptoCard
        v-for="crypto in filteredCryptocurrencies"
        :key="crypto.id"
        :crypto="crypto"
        :is-favorite="favoriteCryptos.some((fav) => fav.id === crypto.id)"
        @toggle-favorite="() => toggleFavorite(crypto)"
      />

      <div
        v-if="searchQuery && filteredCryptocurrencies.length === 0"
        class="text-center text-gray-400 py-8"
      >
        Ничего не найдено по запросу "{{ searchQuery }}"
      </div>
    </div>
  </div>
</template>
