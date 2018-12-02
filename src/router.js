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

function createEopParams(page, contents, action) {
  return [
    {
      source: "web",
      service: store.getters.service,
      page: page,
      pagetype: store.state.pageType,
      contents: contents,
      user: store.getters.syscode,
      action: action
    }
  ];
}

async function sendEopData(params) {
  await axios({
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
}

function pushEopPage(to, from, next) {
  let params = createEopParams(to.meta.eopPage, "", "display");
  sendEopData(params);

  next();
}

async function setEopEvents(to) {
  await router.app.$nextTick();

  let eopElements = document.getElementsByClassName("eop");

  for (let element of eopElements) {
    element.addEventListener("click", e => {
      let params = createEopParams(
        to.meta.eopPage,
        e.target.getAttribute("eop-contents"),
        e.target.getAttribute("eop-action")
      );
      sendEopData(params);
    });
  }
}

router.beforeEach(pushEopPage);
router.afterEach(setEopEvents);

export default router;
