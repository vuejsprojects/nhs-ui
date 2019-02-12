<template>
  <div>
    <b-form @submit="onSubmit">
    <b-container fluid>
      <b-row align-h="center" class="mt-5">
        <b-col cols="12">
          <b-card class="p-3">

            <SearchField
              v-bind:optname="$store.getters.freeSearchName"
              v-bind:oid="$store.getters.freeSearchName"
            ></SearchField>
<!--
            <hr>
            <h3>Or Search by tarriff field</h3>
            <div v-for="(opt, index) in $store.getters.fieldNames" v-bind:key="index">
              <SearchField v-bind:optname="opt" v-bind:oid="opt"></SearchField>
            </div>
            -->
          </b-card>
        </b-col>
      </b-row>
      <hr/>
      <p>Search by tarriff field</p>
      <b-row>
        <b-col cols="3" v-for="(opt, index) in $store.getters.fieldNames" v-bind:key="index">
            <SearchField
              v-bind:optname="opt"
              v-bind:oid="opt"
            ></SearchField>
        </b-col>
      </b-row>
    </b-container>
    <b-button type="submit" variant="info">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import SearchField from "@/components/SearchField.vue";
export default {
  name: "OptionSearch",
  props: {
    searchon: String
  },
  components: {
    SearchField
  },
  data () {
    return {
      form: {
        fieldValues: this.$store.state.fieldValues
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
