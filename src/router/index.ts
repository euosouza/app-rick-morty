import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: () => import("../views/HomeView.vue"),
    // },
    {
      path: "/",
      name: "personagens",
      component: () => import("../views/FiltersView.vue"),
    },
    {
      path: "/:notFound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
