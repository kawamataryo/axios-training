import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  eopServer: "https://jsonplaceholder.typicode.com/posts",
  service: "conference",
  pageType: "sp",
  syscode: "123456",
  eopPage: ""
};

const mutations = {
  setEopPage(state, eopPage) {
    state.eopPage = eopPage;
  }
};

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: {}
});
