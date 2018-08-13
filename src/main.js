import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/spell/:word", name: "home", component: App }
  ]
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
