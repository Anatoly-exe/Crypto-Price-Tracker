<script setup>
defineProps({
  crypto: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle-favorite"]);

const toggleFavorite = () => {
  emit("toggle-favorite");
};
</script>

<template>
  <div
    class="bg-gray-800 rounded-xl p-4 flex items-center justify-between border border-gray-700 hover:bg-gray-750 transition-colors"
  >
    <div class="flex items-center space-x-4">
      <img
        :src="crypto.image"
        :alt="crypto.name"
        class="w-12 h-12 rounded-full"
      />
      <div>
        <div class="flex items-center space-x-2">
          <h3 class="text-white font-bold text-lg">{{ crypto.name }}</h3>
          <span class="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
            #{{ crypto.market_cap_rank }}
          </span>
        </div>
        <p class="text-gray-400 uppercase">{{ crypto.symbol }}</p>
      </div>
    </div>

    <div class="flex items-center space-x-4">
      <div class="text-right">
        <p class="text-white font-bold text-xl">
          ${{ crypto.current_price.toLocaleString() }}
        </p>
        <p
          :class="
            crypto.price_change_percentage_24h >= 0
              ? 'text-green-400'
              : 'text-red-400'
          "
          class="font-semibold"
        >
          {{ crypto.price_change_percentage_24h?.toFixed(2) }}%
        </p>
      </div>

      <button
        @click="toggleFavorite"
        class="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        :class="isFavorite ? 'text-yellow-400' : 'text-gray-400'"
      >
        {{ isFavorite ? "★" : "☆" }}
      </button>
    </div>
  </div>
</template>
