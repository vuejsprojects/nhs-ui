<template>
  <div id="login">
    <b-container>
      <b-row align-h="center" class="mt-5">
        <b-col cols="5">
          <b-card class="p-3">
            <h3 class="mb-4">Login</h3>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <b-form-group
                id="exampleInputGroup1"
                label="Email address:"
                label-for="exampleInput1"
              >
                <b-form-input
                  id="exampleInput1"
                  type="email"
                  v-model="form.email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="exampleInputGroup2"
                label="Your Password:"
                label-for="exampleInput2"
              >
                <b-form-input
                  id="exampleInput2"
                  type="password"
                  v-model="form.password"
                  required
                  placeholder="Enter password"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="exampleGroup4">
                <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
                  <b-form-checkbox value="me">Remember me</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
              <div class="d-flex justify-content-between">
                <div>
                  <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
                  <b-button type="reset" variant="danger">Reset</b-button>
                </div>
                <div>
                  <a href="#">Forgot password</a>
                </div>
              </div>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        checked: []
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      // evt.preventDefault();
      // alert(JSON.stringify(this.form));
      const path = "/api/login";
      const headers = {
        "Content-Type": "application/json",
        // Authorization: "JWT fefege..."
      };
      axios
        .post(path, this.form, { headers: headers })
        .then(response => {
          console.log("Got login response: " + response);
          const authorized = response.data.authorized;
          this.$store.commit("setUserAuthorized", authorized)
          if (authorized) {
            this.$router.push("drug");
          }
        })
        .catch(error => {
          alert("Log in Error");
          console.log("Something wrong: " + error);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Cantarell:400i");

#login {
  background: #eef1f4;
  font-family: "Cantarell", sans-serif;
  text-align: left;
}
.nav-background {
  background: #353535;
}
</style>
