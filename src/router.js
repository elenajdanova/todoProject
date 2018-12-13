import Vue from "vue";
import Router from "vue-router";
import Cards from "./views/Cards.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () =>
    //  import(/* webpackChunkName: "about" */ "./views/About.vue")
    {
      path: "/cards",
      name: "cards",
      component: Cards
    }
  ]
});
