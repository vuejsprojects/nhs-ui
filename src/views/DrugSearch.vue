<template>
  <div class="home">
    <nhs-search msg="Welcome to NHS Drug Tariff Search Page" />
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
