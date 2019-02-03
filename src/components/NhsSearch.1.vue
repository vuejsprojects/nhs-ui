<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Select what you want to search on
    </p>
    <OptionSearch></OptionSearch>
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
