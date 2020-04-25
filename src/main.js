import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import iView from "iview";
import "iview/dist/styles/iview.css"; // 使用 CSS
import vueEsign from "vue-esign";

Vue.use(vueEsign);
Vue.use(iView);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
