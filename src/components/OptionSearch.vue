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
        <hr>
        <p>Search by tarriff field</p>
        <b-row>
          <b-col cols="3" v-for="(opt, index) in $store.getters.fieldNames" v-bind:key="index">
            <SearchField v-bind:optname="opt" v-bind:oid="opt"></SearchField>
          </b-col>
        </b-row>
      </b-container>
      <b-button type="submit" variant="info">Submit</b-button>
    </b-form>
    <b-table striped hover :items="solr_docs" :fields="sortable_doc_fields"></b-table>
  </div>
</template>

<script>
import SearchField from "@/components/SearchField.vue";
import axios from "axios";

export default {
  name: "OptionSearch",
  props: {
    searchon: String
  },
  components: {
    SearchField
  },
  data() {
    return {
      form: {
        fieldValues: this.$store.state.fieldValues
      },
      solr_docs: [],
      sortable_doc_fields: [],
      solr_excluded_fields: ["_version_", "_ts", "id", "ns"]
    };
  },
  methods: {
    onSubmit(evt) {
      // evt.preventDefault();
      // alert(JSON.stringify(this.form));
      const path = "/api/search";
      const headers = {
        "Content-Type": "application/json"
        // Authorization: "JWT fefege..."
      };
      axios
        .post(path, this.form, { headers: headers })
        .then(response => {
          console.log("Got search response: " + response);
          // alert("solr_docs: " + response.data.response.docs);
          // get sortable fields
          let bSortFields = false;
          response.data.response.docs.forEach(element => {
            console.log("doc=" + element);
            // if (bSortFields === false) { wher it should be
            for (var property in element) {
              if (element.hasOwnProperty(property)) {
                console.log("field=" + property + "=" + element[property]);
                if (bSortFields === false &&
                !this.solr_excluded_fields.includes(property)) {
                  this.sortable_doc_fields.push({
                    key: property,
                    sortable: true
                  });
                }
              }
            }
            bSortFields = true;
          });
          this.solr_docs = response.data.response.docs;
        })
        .catch(error => {
          alert("Solr search error");
          console.log("Solr search error - Something wrong: " + error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
