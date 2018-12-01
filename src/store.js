import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  eopServer: "https://jsonplaceholder.typicode.com/posts",
  syscode: "123456"
};

const getters = {
  syscode: state => {
    return state.syscode;
  },
  eopServer: state => {
    return state.eopServer;
  }
};

export default new Vuex.Store({
  state: state,
  mutations: {},
  actions: {},
  getters: getters
});
