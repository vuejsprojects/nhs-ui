<template>
  <div class="hello">
    <p>{{msg}}</p>
    <option-search></option-search>
  </div>
</template>

<script>
import OptionSearch from "@/components/OptionSearch.vue";
export default {
  name: "NhsSearch",
  props: {
    msg: String
  },
  components: {
    OptionSearch
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
