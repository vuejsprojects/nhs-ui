<template>
  <div>
    <b-card no-body class="mb-1">
      <b-collapse visible id="collapse1" class="mt-2">
        <b-form @submit="onSubmit"  @reset="onReset">
          <b-container fluid>
            <b-tabs v-model="form.tabIndex">
              <b-tab title="Free Search">
                <b-row align-h="center" class="mt-5">
                  <b-col cols="12">
                    <b-card class="p-3">
                      <SearchField
                        v-bind:optname="$store.getters.freeSearchName"
                        v-bind:oid="$store.getters.freeSearchName"
                      ></SearchField>
                    </b-card>
                  </b-col>
                </b-row>
                <br>
              </b-tab>
              <b-tab title="Search By Tariff Field">
                <div class="fieldgroup">
                  <b-row>
                    <b-col
                      cols="6"
                      v-for="(opt, index) in $store.getters.fieldNames"
                      v-bind:key="index"
                    >
                      <SearchField v-bind:optname="opt" v-bind:oid="opt"></SearchField>
                    </b-col>
                  </b-row>
                </div>
              </b-tab>
            </b-tabs>
          </b-container>
          <div class="d-flex p-2 justify-content-around">
            <b-button type="submit" variant="info">Run Search</b-button>
            <b-button type="reset" variant="info">Clear Search</b-button>
          </div>
        </b-form>
      </b-collapse>
      <b-card-footer style="height: 10px;">
        <b-btn style="height: 10px;" block v-b-toggle.collapse1 variant="active" class="m-1">
          <span class="when-opened"></span>
          <span class="when-closed"></span>
        </b-btn>
      </b-card-footer>
    </b-card>

    <b-table striped hover :items="solr_docs" :fields="sortable_doc_fields"></b-table>
  </div>
</template>

<script>
import SearchField from "@/components/SearchField.vue";
import { authHeader } from "@/services/HeaderService.js";
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
        fieldValues: this.$store.state.fieldValues,
        tabIndex: 1
      },
      solr_docs: [],
      sortable_doc_fields: [],
      solr_excluded_fields: ["_version_", "_ts", "id", "ns"],
      tabIndex: 1
    };
  },
  methods: {
    onReset(evt) {
      console.log("Reset the all the search fields")
      this.$store.commit('resetFieldValue')
    },
    onSubmit(evt) {
      // evt.preventDefault();
      // alert(JSON.stringify(this.form));
      const path = "/api/search";
      const headers = {
        "Content-Type": "application/json"
        // Authorization: "JWT fefege..."
      };
      if (authHeader()) {
        headers.Authorization = authHeader().Authorization;
      }
      console.log("search headers: ", headers);
      console.log("form: ", this.form);
      // This POST MUST be done thru https otherwis anybody can intercept the JWT token
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
                if (
                  bSortFields === false &&
                  !this.solr_excluded_fields.includes(property)
                ) {
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
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}

.fieldgroup {
  border-width: 1px;
  border-style: solid;
  border-color: lightgray;
  border-radius: 5px;
}

.fieldsearchtitle {
  text-align: center;
  color: cadetblue;
}
</style>
