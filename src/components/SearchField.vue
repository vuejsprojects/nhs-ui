<template>
  <div>
    <label  :for="oid">{{optname}}</label>
    <input type="text" :id="oid" 
        placeholder="Enter the search criteria"
        v-bind:value="fieldvalue"
        v-on:input="setFieldValue"
    />
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
    return {
    };
  },
  computed: {
    fieldvalue: function() {
      const a=1
      return store.state.fieldValues[optname]
    }
  },
  methods: {
    setFieldValue(e) {
      this.$store.commit("setFieldValue", e.target.value,"");
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lfield {
  color: cadetblue;
  display: block; 
  width: 100px;
}

input[type=text]:focus {
  background-color: lightblue;
}

.ifield {
  text-align: left;
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
