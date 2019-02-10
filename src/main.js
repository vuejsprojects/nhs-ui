import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import store from "./ui-store/store";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;
Vue.use(Vuex)
Vue.use(BootstrapVue);

new Vue({
  router,
  store: new Vuex.Store(store),
  render: h => h(App)
}).$mount("#app");
