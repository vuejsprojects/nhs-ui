<template>
  <div id="app">
    <div class="logo mt-3 mr-3">
      <img alt="Vue logo" src="@/assets/nhs_logo.gif">
    </div>

    <b-navbar v-if="$store.state.userAuthorized" toggleable="md" type="dark" class="nav-background">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">Site Map</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item to="/drug">Drug Search</b-nav-item>
          <b-nav-item href="#" disabled>To remind me to disable Drug Search</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="logoff">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!--
    <div id="nav">
      <router-link to="/">Login</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/drug">Drug Search</router-link>
    </div>
    -->
    <router-view/>
  </div>
</template>
<script>
export default {
  methods: {
    logoff(evt) {
      // evt.preventDefault();
      // alert(JSON.stringify(this.form));
      const path = "/api/logoff";
      const headers = {
        "Content-Type": "application/json"
        // Authorization: "JWT fefege..."
      };
      this.$store.commit("setUserAuthorized", false);
      this.$router.push("/");
      // axios
      //   .post(path, this.form, { headers: headers })
      //   .then(response => {
      //     console.log("Got login response: " + response);
      //     const authorized = response.data.authorized;
      //     this.$store.commit("setUserAuthorized", authorized);
      //     if (authorized) {
      //       this.$router.push("drug");
      //     }
      //   })
      //   .catch(error => {
      //     alert("Log in Error");
      //     console.log("Something wrong: " + error);
      //   });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app img {
  height: 75px;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.logo {
  text-align: right;
}
</style>
