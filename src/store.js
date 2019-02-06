import Vue from "vue";
import Vuex from "vuex";
import mutations from "@/mutations"

Vue.use(Vuex);

export default {
  state: {
    options: ["Name", "Price", "Category", "Code", "Period",
    "Quantity", "Unit"],
    optionsChecked: []
  },
  mutations,
  getters: {},
  actions: {}
};
