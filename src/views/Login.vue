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
  }
};
</script>
