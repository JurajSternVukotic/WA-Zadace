import { createRouter, createWebHistory } from "vue-router";
import Proizvod from "../components/Proizvod.vue";
import Proizvodi from "../components/Proizvodi.vue";

const routes = [
  {
    path: "/proizvodi",
    name: "Proizvodi",
    component: Proizvodi,
  },
  {
    path: "/proizvodi/:id",
    name: "Proizvod",
    component: Proizvod,
    props: true,
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
