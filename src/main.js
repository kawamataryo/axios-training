import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { eopFunctions } from "./eop";

Vue.config.productionTip = false;
Vue.mixin(eopFunctions);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
