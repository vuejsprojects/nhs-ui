<template>
  <div>
    <h3>Enter some free text for a wild search</h3>
    <SearchField v-bind:optname="$store.getters.freeSearchName" 
              v-bind:oid="$store.getters.freeSearchName">
    </SearchField>
    <h3>Or enter a search criteria in the fields you are intersted in</h3>
    <div v-for="opt in $store.getters.fieldNames"
      v-bind:key="opt.id">
      <SearchField v-bind:optname="opt" v-bind:oid="opt"></SearchField>
    </div>
    
  </div>
</template>

<script>
import SearchField from "@/components/SearchField.vue";
export default {
  name: "OptionSearch",
  props: {
    searchon: String
  },
  components: {
    SearchField
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
