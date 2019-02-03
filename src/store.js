import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    options: ["Name", "Price", "Category", "Code", "Period",
    "Quantity", "Unit"],
    optionsChecked: [],
    someOption: 'option 3'
  },
  mutations: {
    updateStoredOption(state, val) {
      state.optionsChecked = val;
      state.someOption = val
    }
  },
  getters: {},
  actions: {}
});
