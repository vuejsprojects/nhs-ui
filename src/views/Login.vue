<template>
  <div class="home">
    <LoginDialog/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginDialog from "@/components/LoginDialog.vue"

export default {
  name: "login",
  components: {
    LoginDialog
  },
  // when this vue is created first thing it does is a logout
  created () {
        // reset login status
        console.log('Login view is activated so proceed to log out first');
        this.$store.dispatch('authentication/logout');
    }
};
</script>
