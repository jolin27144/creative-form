import Vue from "vue";
import App from "./App.vue";
import iView from "iview";
import "iview/dist/styles/iview.css"; // 使用 CSS
import vueEsign from "vue-esign";
import CreativeForm from "@/creative-form";

Vue.use(CreativeForm);
Vue.use(vueEsign);
Vue.use(iView);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
