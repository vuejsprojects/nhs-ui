<template>
  <div>
    <label class="lfield" :for="oid">{{optname}}</label>
    <input class="ifield" type="text" :id="oid" 
        placeholder="Enter the search criteria"
        v-bind:value="fieldvalue"
        v-on:input="setFieldValue"
    />
  </div>
</template>
<script>
export default {
  name: "TestFIeld",
  props: {
    oid: String,
    optname: String
  },
  data: function() {
    return {
    };
  },
  computed: {
    fieldvalue() {
      const a=1
//      return this.$store.state.stuff
      return this.$store.state.fieldValues[this.optname]
    }
  },
  methods: {
    setFieldValue(e) {
      console.log('setFieldValue: '+e.target.id+ " - " +e.target.value)
      this.$store.commit("setFieldValue", e);
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
