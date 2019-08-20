import Vue from "vue";
import Vuex from 'vuex';
import counter from './counter';
import state from "./state";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    counter
  },
  state
})
