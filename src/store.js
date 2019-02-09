import Vue from "vue";
import Vuex from "vuex";
import mutations from "@/mutations"
import {free_search} from "@/store_config"

Vue.use(Vuex);

export default {
  state: {
    options: ["Name", "Price", "Category", "Code", "Period",
      "Quantity", "Unit"],
    optionsChecked: [],
    fieldValues:
    {
      "name": "",
      "price": "2345",
      "category": "",
      "code": "",
      "period": "",
      "quantity": "",
      "unit": "",
      [free_search]: "free"
    },
    freeSearch: {
      name: "free_search",
      value: " "
    }
  },
  mutations,
  getters: {
    fieldNames: state => {
      console.log('free_search: ' + free_search);
      const names = [];
      for(let k in state.fieldValues) {
        names.push(k)
      }
      // removing free search
      const filtered = names.filter(n => n !== free_search);
      console.log("filtered field values:" + filtered);
      return filtered;
    },
    freeSearchName: state => free_search
  },
  actions: {}
};
