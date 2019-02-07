import Vue from "vue";
import Vuex from "vuex";
import mutations from "@/mutations"

Vue.use(Vuex);

export default {
  state: {
    options: ["Name", "Price", "Category", "Code", "Period",
      "Quantity", "Unit"],
    optionsChecked: [],
    fieldValues:
    {
      "name": "",
      "price": "",
      "category": "",
      "code": "",
      "feriod": "",
      "quantity": "",
      "unit": ""
    },
    stuff: ""
  },
  mutations,
  getters: {},
  actions: {}
};
