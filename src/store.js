import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  eopServer: "https://reqres.in/api/users",
  service: "conference",
  pageType: "sp",
  syscode: "123456"
};

const getters = {
  eopServer: state => {
    return state.eopServer;
  },
  service: state => {
    return state.service;
  },
  syscode: state => {
    return state.syscode;
  },
  pageType: state => {
    return state.pageType;
  }
};

export default new Vuex.Store({
  state: state,
  mutations: {},
  actions: {},
  getters: getters
});
