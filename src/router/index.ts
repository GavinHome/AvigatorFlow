import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Designer.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/flow",
    name: "Flow",
    component: () => import(/* webpackChunkName: "flow" */ "../views/Home.vue"),
  },
  {
    path: "/v1",
    name: "v1",
    component: () =>
      import(/* webpackChunkName: "designer_v1" */ "../views/DesignerV1.vue"),
  },
  {
    path: "/v2",
    name: "v2",
    component: () =>
      import(/* webpackChunkName: "designer_v2" */ "../views/Designer.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
