import { ref, onMounted } from "vue";

export function useFavorites() {
  const favoriteCryptos = ref([]);

  const loadFavorites = () => {
    const saved = localStorage.getItem("favoriteCryptos");
    if (saved) {
      favoriteCryptos.value = JSON.parse(saved);
    }
  };

  const toggleFavorite = (crypto) => {
    const index = favoriteCryptos.value.findIndex(
      (fav) => fav.id === crypto.id
    );

    if (index > -1) {
      favoriteCryptos.value.splice(index, 1);
    } else {
      favoriteCryptos.value.push(crypto);
    }

    localStorage.setItem(
      "favoriteCryptos",
      JSON.stringify(favoriteCryptos.value)
    );
  };

  onMounted(() => {
    loadFavorites();
  });

  return {
    favoriteCryptos,
    toggleFavorite,
    loadFavorites,
  };
}
