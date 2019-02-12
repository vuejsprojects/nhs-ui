<template>
  <div>
    <label class="lfield" :for="oid">{{optname}}</label>
    <input
      class="ifield"
      type="text"
      :id="oid"
      placeholder="Enter the search criteria"
      v-bind:value="fieldvalue"
      v-on:input="setFieldValue"
    >
  </div>
</template>
<script>
export default {
  name: "SearchField",
  props: {
    oid: String,
    optname: String
  },
  data: function() {
    return {};
  },
  computed: {
    fieldvalue() {
      return this.$store.state.fieldValues[this.optname];
    }
  },
  methods: {
    setFieldValue(e) {
      console.log("event: " + e.target.id + " - " + e.target.value);
      const payload = {
        key: e.target.id,
        value: e.target.value
      };
      this.$store.commit("setFieldValue", payload);
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lfield {
  color: cadetblue;
  /*display: block;*/
  width: 100px;
}

input[type="text"]:focus {
  background-color: lightblue;
}

.ifield {
  text-align: left;
  height: 12px;
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
