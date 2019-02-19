<template>
  <div id="login">
    <b-container>
      <b-row align-h="center" class="mt-5">
        <b-col cols="5">
          <h3>Create an account</h3>
          <p>Join the thousands of other people who deed to track drug prices! By creating an account, you’ll be able to access price history and much more.</p>
          <b-btn  v-if="showLogin" v-on:click="showRegistrationForm">Register</b-btn>
        </b-col>
        <b-col cols="5" v-if="showLogin">
          <Signin/>
        </b-col>
        <b-col cols="5" v-if="!showLogin">
          <signup/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Signin from "@/components/Signin.vue";
import Signup from "@/components/Signup.vue";

export default {
  data() {
    return {
      showLogin: true
    };
  },
  components: {
    Signin,
    Signup
  },
  methods: {
    showRegistrationForm() {
      this.showLogin = false
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
</style>
