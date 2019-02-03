<template>
  <div class="home">
    <img alt="NHS logo" src="../assets/nhs_logo.gif" />
    <NhsSearch msg="Welcome to NHS Drug Tarif Search Page" />
  </div>
</template>

<script>
// @ is an alias to /src
import NhsSearch from "@/components/NhsSearch.vue";

export default {
  name: "home",
  components: {
    NhsSearch
  }
};
</script>
