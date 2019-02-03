<template>
  <div>
    <h2>Select the options you want to search on</h2>
    <div v-for="opt in $store.state.options"
      v-bind:key="opt.id">
      <search-on v-bind:optname="opt" v-bind:oid="opt"></search-on>
    </div>
    
  </div>
</template>

<script>
import SearchOn from "@/components/SearchOn.vue";
export default {
  name: "OptionSearch",
  props: {
    searchon: String
  },
  components: {
    SearchOn
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
