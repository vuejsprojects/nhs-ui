import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import NotFound from "./views/NotFound.vue";

Vue.use(Router);

export default new Router({
  // https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
  // mode: 'history', // Not sure I want to use this mode
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/drug",
      name: "drug",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "drug" */ "./views/DrugSearch.vue")
    },
    // 404 is separated into 2 routes is so that one can 
    // also programmatically direct the user to the 404 
    // route in such a case when some data needed does not 
    // resolve
    {
      path: "/404",
      component: NotFound
    },
    // {
    //   path: "*",
    //   redirect: "/404",
    // },
  ]
});
