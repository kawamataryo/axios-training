import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home";
import About from "./views/About";
import User from "./views/User";

import { setEopEvents } from "./eop";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        eopPage: "hoge"
      }
    },
    {
      path: "/about",
      name: "about",
      component: About,
      meta: {
        eopPage: "about"
      }
    },
    {
      path: "/user",
      name: "user",
      component: User,
      meta: {
        eopPage: "user"
      }
    }
  ]
});

router.afterEach(async () => {
  await router.app.$nextTick();
  setEopEvents();
});

export default router;
