<template>
  <div>
    <input type="checkbox" :id="oid" 
        v-bind:value="optname"
        v-on:input="updateStoredOption"
    />
    <label :for="oid">{{optname}}</label>
  </div>
</template>
<script>
export default {
  name: "SearchOn",
  props: {
    oid: String,
    optname: String
  },
  data: function() {
    return {
    };
  },
  computed: {
  },
  methods: {
    updateStoredOption(e) {
      this.$store.commit("updateStoredOption", e.target.value);
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
