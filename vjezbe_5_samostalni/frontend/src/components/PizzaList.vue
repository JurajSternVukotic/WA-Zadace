<!-- src/components/PizzaList.vue -->
<template>
  <div class="row">
    <div v-for="pizza in pizze" :key="pizza._id" class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <img :src="pizza.slika" class="card-img-top" alt="Slika pizze" />
        <div class="card-body">
          <h5 class="card-title">{{ pizza.naziv }}</h5>
          <p class="card-text"><strong>Cijena:</strong> {{ pizza.cijena }} €</p>
          <p class="card-text">
            <strong>Sastojci:</strong> {{ pizza.sastojci.join(", ") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PizzaList",
  data() {
    return {
      pizze: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:3000/pizze");
      this.pizze = response.data;
    } catch (error) {
      console.error("Greška prilikom dohvata pizza:", error);
    }
  },
};
</script>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
