import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/config/axios';

Vue.use(Vuex);
axios.defaults.headers.common.token = localStorage.getItem('token');

export default new Vuex.Store({
  state: {
    user: {},
    isLogin: false,
  },
  mutations: {
    SET_IS_LOGIN(state, payload) { state.isLogin = payload; },
    SET_USER(state, payload) { state.user = payload; },
  },
  actions: {
    checkLogin({ commit }) {
      return new Promise((resolve, reject) => {
        if (localStorage.getItem('token')) {
          axios.get('/user')
            .then(({ data }) => {
              commit('SET_IS_LOGIN', true);
              commit('SET_USER', data);
              resolve();
            })
            .catch(reject);
        }
      });
    },
    login(_, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/user/signin', payload)
          .then(({ data }) => {
            localStorage.setItem('token', data.token);
            axios.defaults.headers.common.token = data.token;
            resolve();
          })
          .catch(reject);
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        localStorage.clear();
        commit('SET_USER', {});
        commit('SET_IS_LOGIN', false);
        resolve();
      });
    },
  },
});
