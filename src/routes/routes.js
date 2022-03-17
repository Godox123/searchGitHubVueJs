import Home from "../components/home/home.vue";
import NotFound from "../common/components/notFound/notfound.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Home },
  {
    path: "/:catchAll(.*)",
    name: "PageNotExist",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
