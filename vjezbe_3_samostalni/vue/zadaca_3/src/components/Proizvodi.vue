<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-center">Proizvodi</h1>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <router-link
        v-for="proizvod in proizvodi"
        :key="proizvod.id"
        :to="`/proizvodi/${proizvod.id}`"
        class="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div class="w-full h-48 flex items-center justify-center bg-gray-100">
          <img
            v-if="proizvod.slike && proizvod.slike.length > 0"
            :src="proizvod.slike[0]"
            alt="Proizvod slika"
            class="max-w-full max-h-full object-contain"
          />
          <div v-else class="text-gray-500">No Image Available</div>
        </div>
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ proizvod.naziv }}</h2>
          <p class="text-gray-700 mb-2">Cijena: {{ proizvod.cijena }} kn</p>
          <p class="text-gray-600">
            Veličine:
            <span v-if="Array.isArray(proizvod.velicine)">
              {{ proizvod.velicine.join(", ") }}
            </span>
            <span v-else>
              {{ proizvod.velicine }}
            </span>
          </p>
        </div>
      </router-link>
    </div>

    <div v-if="loading" class="flex justify-center items-center mt-8">
      <svg
        class="animate-spin h-8 w-8 text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
    </div>

    <div v-if="error" class="mt-8 text-center text-red-500">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const proizvodi = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchProizvodi = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get("http://localhost:3000/proizvodi");
    proizvodi.value = response.data;
  } catch (err) {
    console.error("Greška prilikom dohvata proizvoda:", err);
    error.value = "Neuspješno učitavanje proizvoda. Pokušajte ponovno kasnije.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProizvodi();
});
</script>
