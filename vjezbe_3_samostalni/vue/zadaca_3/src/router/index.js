import { createRouter, createWebHistory } from "vue-router";
import Proizvod from "../components/Proizvod.vue";

const routes = [
  {
    path: "/proizvodi/:id",
    name: "Proizvod",
    component: Proizvod,
    props: true,
  },
  {
    path: "/proizvodi",
    name: "Proizvodi",
    component: Proizvod,
  },

  {
    path: "/",
    redirect: "/proizvodi",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
