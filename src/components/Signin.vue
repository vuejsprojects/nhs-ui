<template>
  <b-card class="p-3">
    <h3 class="mb-4">Login</h3>
    <p class="text-danger" v-if="alert.status.loggingError">{{alert.message}}</p>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="exampleInputGroup1" label="Email address:" label-for="exampleInput1">
        <b-form-input
          id="exampleInput1"
          type="email"
          v-model="form.email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2" label="Your Password:" label-for="exampleInput2">
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
      <div>
        <b-form-checkbox
          id="captcha"
          v-model="captchaStatus"
          value="accepted"
          unchecked-value="not_accepted"
        >I'm not a robot (http://www.captcha.net/)</b-form-checkbox>

        <div>State:
          <strong>{{ captchaStatus }}</strong>
        </div>
      </div>
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
</template>

<script>

export default {
  name: "Signin",
  data() {
    return {
      form: {
        email: "",
        password: "",
        checked: []
      },
      show: true,
      captchaStatus: "not verified"
    };
  },
  computed: {
    alert() {
      return this.$store.state.authentication
    }
  },
  methods: {
    onSubmit(evt) {
      console.log("Signin - login: " + this.form.email);
      this.$store.dispatch("authentication/login", this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = "";
      this.form.password = "";
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
</style>

