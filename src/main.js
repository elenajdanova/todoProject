import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Storage from "./services/storage";

Vue.config.productionTip = false;
Vue.prototype.$storage = Storage;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
