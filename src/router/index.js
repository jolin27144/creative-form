import Vue from "vue";
import VueRouter from "vue-router";
import CreativeForm from "@/views/CreativeForm";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "CreativeForm",
    component: CreativeForm
  }
];

const router = new VueRouter({
  routes
});

export default router;
