<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Select what you want to search on
    </p>
  </div>
</template>

<script>
export default {
  name: "NhsSearch",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
