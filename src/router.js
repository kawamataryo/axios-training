import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Home from "./views/Home";
import About from "./views/About";
import User from "./views/User";

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

async function setEopEvents() {
  await router.app.$nextTick();

  let eopElements = document.getElementsByClassName("eop");

  for (let element of eopElements) {
    element.addEventListener("click", e => {
      console.log(e.target.getAttribute("eop-contents"));
      console.log(e.target.getAttribute("eop-action"));
    });
  }
}

function pushEopPage(to, from, next) {
  console.log(`page: ${to.meta.eopPage}`);
  console.log(`syscode: ${store.getters.syscode}`);
  next();
}

router.beforeEach(pushEopPage);
router.afterEach(setEopEvents);

export default router;
