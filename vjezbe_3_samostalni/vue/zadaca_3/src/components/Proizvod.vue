<!-- Proizvod.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const props = defineProps({
  id: {
    type: String,
  },
});
const router = useRouter();

let proizvod = ref({
  id: 0,
  naziv: "",
  cijena: 0,
  velicine: [],
  opis: "",
  slike: [],
  dostupne_boje: [],
  karakteristike: {},
});

console.log(props.id);
onMounted(async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/proizvodi/${props.id}`
    );
    proizvod.value = response.data;
  } catch (error) {
    console.error("Greška u dohvatu podataka: ", error);
  }
});

let podaci = ref({
  naruceni_proizvodi: [
    { id: 1, narucena_kolicina: 2 },
    { id: 3, narucena_kolicina: 1 },
  ],
});

const posaljiNarudzbu = (event) => {
  event.preventDefault();

  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  const existingProduct = cart.find((item) => item.id === proizvod.value.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...proizvod.value, quantity: 1 });
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));

  router.push("/proizvodi");
};
</script>
<template>
  <div class="bg-white">
    <div class="pt-6">
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <li>
            <div class="flex items-center">
              <a href="#" class="mr-2 text-sm font-medium text-gray-900"
                >Odjeća</a
              >
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="currentColor"
                aria-hidden="true"
                class="h-5 w-4 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>

          <li class="text-sm">
            <a
              href="#"
              aria-current="page"
              class="font-medium text-gray-500 hover:text-gray-600"
              >{{ proizvod.naziv }}</a
            >
          </li>
        </ol>
      </nav>

      <!-- Image gallery -->
      <div
        class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x8 lg:px-8"
      >
        <div
          class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block"
        >
          <img
            :src="proizvod.slike[0]"
            alt="Two each of gray, white, and black shirts laying
flat."
            class="h-full w-full object-cover object-center"
          />
        </div>
        <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              :src="proizvod.slike[3]"
              alt="illo inventore veritatis et quasi architecto beatae vitae"
              class="h-full w-full object-cover object-center"
            />
          </div>
          <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              :src="proizvod.slike[2]"
              alt="accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab"
              class="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <img
            :src="proizvod.slike[1]"
            alt="Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
            class="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      <!-- Product info -->
      <div
        class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"
      >
        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1
            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            {{ proizvod.naziv }}
          </h1>
        </div>

        <!-- Options -->
        <div class="mt-4 lg:row-span-3 lg:mt-0">
          <h2 class="sr-only">Product information</h2>
          <p class="text-3xl tracking-tight text-gray-900">
            {{ proizvod.cijena }}€
          </p>

          <form class="mt-10" @submit="posaljiNarudzbu">
            <!-- Colors -->
            <div class="mt-6">
              <h3 class="text-sm font-medium text-gray-900">Dostupne Boje</h3>
              <div class="mt-2 flex items-center space-x-3">
                <span
                  v-for="(boja, index) in proizvod.dostupne_boje"
                  :key="index"
                  class="h-6 w-6 rounded-full border border-gray-300"
                  :style="{ backgroundColor: boja.toLowerCase() }"
                  :title="boja"
                ></span>
              </div>
            </div>

            <!-- Sizes -->
            <div class="mt-10">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-gray-900">Veličina</h3>
              </div>

              <fieldset aria-label="Choose a size" class="mt-4">
                <div v-for="velicina in proizvod.velicine" :key="velicina">
                  <label
                    class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bggray-50 focus:outline-none sm:flex-1 sm:py-6"
                  >
                    <input
                      type="radio"
                      name="size-choice"
                      value="_"
                      class="sr-only"
                    />
                    <span>{{ velicina }}</span>
                    <span
                      class="pointer-events-none absolute -inset-px rounded-md"
                      aria-hidden="true"
                    >
                    </span>
                  </label>
                </div>
              </fieldset>
            </div>

            <button
              type="submit"
              class="mt-10 flex w-full items-center justify-center rounded-md border bordertransparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Dodaj u košaricu
            </button>
          </form>
        </div>

        <div
          class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"
        >
          <!-- Description and details -->
          <div>
            <h3 class="sr-only">Description</h3>

            <div class="space-y-6">
              <p class="text-base text-gray-900">
                {{ proizvod.opis }}
              </p>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">Karakteristike</h3>
            <ul class="mt-2 list-disc list-inside text-sm text-gray-600">
              <li
                v-for="(vrijednost, kljuc) in proizvod.karakteristike"
                :key="kljuc"
              >
                <strong>{{ kljuc }}:</strong> {{ vrijednost }}
              </li>
            </ul>
          </div>

          <div class="mt-10">
            <h2 class="text-sm font-medium text-gray-900">Detalji</h2>

            <div class="mt-4 space-y-6">
              <p class="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
