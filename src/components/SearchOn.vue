<template>
  <div>
    <input type="checkbox" id="oid" 
        v-bind:value="optname"
        v-on:input="updateStoredOption"
    />
    <label for="oid">{{optname}}</label>
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
      dummy: "option 1",
      count: 0
    };
  },
  computed: {
    optionsChecked: function() {
      return this.$store.state.someOption;
    }
  },
  methods: {
    updateStoredOption(e) {
      //this.dummy = e.target.value;
      this.$store.commit("updateStoredOption", e.target.value);
      console.log('>' + e.target.value + '<')
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
