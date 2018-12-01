import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  syscode: "123456"
};

const getters = {
  syscode: state => {
    return state.syscode;
  }
};

export default new Vuex.Store({
  state: state,
  mutations: {},
  actions: {},
  getters: getters
});
