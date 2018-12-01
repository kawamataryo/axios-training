import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import axios from "axios";

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

function pushEopPage(to, from, next) {
  let params = {
    syscode: store.getters.syscode,
    eopPage: to.meta.eopPage
  };
  axios({
    method: "POST",
    url: store.getters.eopServer,
    data: params
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });

  next();
}

async function setEopEvents(to) {
  await router.app.$nextTick();

  let eopElements = document.getElementsByClassName("eop");

  for (let element of eopElements) {
    element.addEventListener("click", e => {
      let params = {
        syscode: store.getters.syscode,
        eopPage: to.meta.eopPage,
        eopAction: e.target.getAttribute("eop-action"),
        eopContents: e.target.getAttribute("eop-contents")
      };
      axios({
        method: "POST",
        url: store.getters.eopServer,
        data: params
      })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
}

router.beforeEach(pushEopPage);
router.afterEach(setEopEvents);

export default router;
