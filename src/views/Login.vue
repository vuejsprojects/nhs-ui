<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/nhs_logo.gif" />
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
  }
};
</script>
