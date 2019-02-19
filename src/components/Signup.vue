<template>
  <b-card class="p-3">
    <h3 class="mb-4">Fill out the form to create your account. </h3>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="exampleInputGroup1"
        label="Enter your email address (this will be your login):"
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
        label="Email address again"
        label-for="exampleInput2"
        :invalid-feedback="emailNotSame"
        :state="emailState"
      >
        <b-form-input
          id="exampleInput2"
          type="email"
          v-model="form.email2"
          required
          placeholder="Enter same email"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup3" label="Choose a Password:" label-for="exampleInput3">
        <b-form-input
          id="exampleInput3"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="exampleInputGroup4"
        label="Password again:"
        label-for="exampleInput4"
        :invalid-feedback="passwordNotSame"
        :state="pswState"
      >
        <b-form-input
          id="exampleInput"
          type="password"
          v-model="form.password2"
          required
          placeholder="Enter same password"
        ></b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-between">
        <div>
          <b-button type="submit" variant="primary">Register</b-button>&nbsp;
          <b-button type="reset" variant="danger">Reset</b-button>
        </div>
      </div>
    </b-form>
  </b-card>
</template>

<script>
import { userLogin } from "@/services/UserServices.js";
import { authentication } from "@/ui-store/authentication";

export default {
  name: "Signin",
  data() {
    return {
      form: {
        email: "",
        password: "",
        email2: "",
        password2: ""
      },
      show: true,
      errEmail: false,
      errPasswd: false
    };
  },
  computed: {
    emailState() {
      return this.form.email == this.form.email2
    },
    emailNotSame() {
      if (!this.emailState) {
        console.log("emailstate: "+ this.emailState)
        return "Please make sure the two email adresses are identical";
      }
    },
    validFeedbackEmail() {
      return this.emailState ? "Thanks" : "";
    },
    pswState() {
      return this.form.password == this.form.password2
    },
    passwordNotSame() {
      if (!this.pswState) {
        return "Please make sure the two email adresses are identical";
      }
    },
    validFeedbackPswd() {
      return this.pswState ? "Thanks" : "";
    }
  },
  methods: {
    onSubmit(evt) {
      // userLogin.login(this.form)
      console.log("Signup - for: " + this.form.email);
      if (this.form.email != this.form.email2) {
        this.errEmail = true;
      }
      if (this.form.password != this.form.password2) {
        this.errPasswd = true;
      }
      if (!this.errPasswd && !this.errEmail) {
        this.$store.dispatch("authentication/loginAuth", this.form);
      }
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = "";
      this.form.password = "";
      this.form.email2 = "";
      this.form.password2 = "";
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
</style>

