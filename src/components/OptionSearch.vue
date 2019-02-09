<template>
  <div>
    <h3>Enter some free text for a wild search</h3>
    <TestFIeld v-bind:optname="$store.getters.freeSearchName" 
              v-bind:oid="$store.getters.freeSearchName">
    </TestFIeld>
    <h3>Or enter a search criteria in the fields you are intersted in</h3>
    <div v-for="opt in $store.getters.fieldNames"
      v-bind:key="opt.id">
      <TestFIeld v-bind:optname="opt" v-bind:oid="opt"></TestFIeld>
    </div>
    
  </div>
</template>

<script>
import SearchOn from "@/components/SearchOn.vue";
import SearchField from "@/components/SearchField.vue";
import TestFIeld from "@/components/TestFIeld.vue";
export default {
  name: "OptionSearch",
  props: {
    searchon: String
  },
  components: {
    SearchOn,
    SearchField,
    TestFIeld
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
