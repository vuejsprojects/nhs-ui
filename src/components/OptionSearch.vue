<template>
  <div>
    <h3>Select the options you want to search on</h3>
    <div v-for="opt in $store.state.options"
      v-bind:key="opt.id">
      <search-on v-bind:optname="opt" v-bind:oid="opt"></search-on>
    </div>
    <!--
    <div v-for="opt in $store.state.options"
      v-bind:key="opt.id">
      <SearchField v-bind:optname="opt" v-bind:oid="opt"></SearchField>
    </div>
    -->
    <div v-for="opt in $store.state.options"
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
