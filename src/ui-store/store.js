import Vue from "vue";
import Vuex from "vuex";
import mutations from "@/ui-store/mutations";
import { free_search } from "@/ui-store/store_config";

Vue.use(Vuex);

export default {
  state: {
    fieldValues: {
      Medicine: "",
      Formulations: "",
      "Special Container": "",
      "Spec Cont Ind": "",
      "Basic Price": "",
      category: "",
      "VMPP Snomed Code": "",
      period: "",
      "Pack Size": "",
      unit: "",
      [free_search]: ""
    },
    userAuthorized: false
  },
  mutations,
  getters: {
    fieldNames: state => {
      console.log("free_search: " + free_search);
      const names = [];
      for ( let k in state.fieldValues) {
        names.push(k);
      }
      // or const names = Object.keys(state.fieldValues)
      // removing free search
      const filtered = names.filter(n => n !== free_search);
      console.log("filtered field values:" + filtered);
      return filtered;
    },
    fieldNumber: (state, getters) => {
      return Object.keys(getters.fieldNames).length;
    },
    freeSearchName: () => free_search
  },
  actions: {}
};
