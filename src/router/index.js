import Vue from "vue";
import VueRouter from "vue-router";
import mainWrap from "../components/v-main-wrap";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "v-main-wrap",
    component: mainWrap
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
