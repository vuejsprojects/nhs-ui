<template>
  <div>
    <h2>{{msg}}</h2>
    <div class="nshsearch">
    <option-search></option-search>
    </div>
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
.nshsearch {
  text-align: left;
}
</style>
