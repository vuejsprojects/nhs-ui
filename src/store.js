import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    options: ["Name", "Price", "Category", "Code", "Period",
    "Quantity", "Unit"],
    optionsChecked: [],
  },
  mutations: {
    updateStoredOption(state, val) {
      var pos = state.optionsChecked.indexOf(val)
      if(pos === -1) {
        state.optionsChecked.push(val)
      }
      else {
        state.optionsChecked.splice(pos, 1)
      }
    }
  },
  getters: {},
  actions: {}
});
