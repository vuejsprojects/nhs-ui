<template>
  <div id="app">
    <div class="logo mt-3 mr-3">
    <img alt="Vue logo" src="@/assets/nhs_logo.gif" />
    </div>
    <div id="nav">
      <router-link to="/">Login</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/drug">Drug Search</router-link>
    </div>
    <router-view />
  </div>
</template>

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
