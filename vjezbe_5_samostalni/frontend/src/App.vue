<template>
  <div class="container mt-4">
    <h1 class="mb-4">Pizze</h1>
    <PizzaList />

    <hr class="my-5" />

    <h2>Naruči pizze</h2>
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="submitOrder">
          <div class="mb-3">
            <label for="ime" class="form-label">Ime</label>
            <input
              type="text"
              id="ime"
              class="form-control"
              v-model="ime"
              required
            />
          </div>

          <div class="mb-3">
            <label for="adresa" class="form-label">Adresa</label>
            <input
              type="text"
              id="adresa"
              class="form-control"
              v-model="adresa"
              required
            />
          </div>

          <div class="mb-3">
            <label for="telefon" class="form-label">Telefon</label>
            <input
              type="text"
              id="telefon"
              class="form-control"
              v-model="telefon"
              required
            />
          </div>

          <h3>Stavke narudžbe</h3>
          <div
            v-for="(stavka, index) in pizzaStavke"
            :key="index"
            class="mb-3 border p-3"
          >
            <div class="mb-2">
              <label class="form-label">Naziv pizze</label>
              <input
                type="text"
                class="form-control"
                v-model="stavka.naziv"
                required
              />
            </div>
            <div class="mb-2">
              <label class="form-label">Količina</label>
              <input
                type="number"
                class="form-control"
                step="0.5"
                v-model.number="stavka.kolicina"
                required
              />
            </div>
            <div class="mb-2">
              <label class="form-label">Veličina</label>
              <select class="form-select" v-model="stavka.velicina" required>
                <option value="">Odaberi veličinu</option>
                <option value="mala">mala</option>
                <option value="srednja">srednja</option>
                <option value="velika">velika</option>
              </select>
            </div>
            <button
              type="button"
              class="btn btn-danger"
              @click="removeStavka(index)"
            >
              Ukloni stavku
            </button>
          </div>

          <button
            type="button"
            class="btn btn-secondary mb-3"
            @click="addStavka"
          >
            Dodaj stavku
          </button>

          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="alert alert-success">
            {{ successMessage }}
          </div>

          <button type="submit" class="btn btn-primary">Naruči pizze</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import PizzaList from "./components/PizzaList.vue";
import axios from "axios";

export default {
  components: {
    PizzaList,
  },
  data() {
    return {
      ime: "",
      adresa: "",
      telefon: "",
      pizzaStavke: [{ naziv: "", kolicina: 1, velicina: "" }],
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    addStavka() {
      this.pizzaStavke.push({ naziv: "", kolicina: 1, velicina: "" });
    },
    removeStavka(index) {
      this.pizzaStavke.splice(index, 1);
    },
    async submitOrder() {
      this.errorMessage = "";
      this.successMessage = "";
      try {
        const payload = {
          ime: this.ime,
          adresa: this.adresa,
          telefon: this.telefon,
          pizza_stavke: this.pizzaStavke,
        };
        let response = await axios.post(
          "http://localhost:3000/narudzba",
          payload
        );
        this.successMessage = `Narudžba uspješno poslana! Ukupna cijena: ${response.data.ukupna_cijena} €`;
        // Reset form
        this.ime = "";
        this.adresa = "";
        this.telefon = "";
        this.pizzaStavke = [{ naziv: "", kolicina: 1, velicina: "" }];
      } catch (error) {
        console.error(error);
        this.errorMessage =
          error.response?.data?.error || "Greška prilikom slanja narudžbe.";
      }
    },
  },
};
</script>
