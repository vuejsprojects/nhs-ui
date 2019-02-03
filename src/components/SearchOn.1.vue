<template>
  <div>
    <input
      type="checkbox"
      v-bind:id="oid"
      v-bind:value="optionsChecked"
      @:input="updateStoredOption"
    >
    <label v-bind:for="oid">{{optname}}</label>
  </div>
</template>
<script>
export default {
  name: "SearchOn",
  props: {
    oid: String,
    optname: String
  },
  computed: {
    optionsChecked: function() {
      return this.$store.optionsChecked;
    }
  },
  methods: {
    updateSoredOption(e) {
      this.$store.commit("updateStoredOption", e.target.value);
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
