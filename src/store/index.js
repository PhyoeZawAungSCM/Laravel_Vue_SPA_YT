import Vuex from 'vuex';
import Vue from 'vue';
import { http } from '@/services/http_services';
Vue.use(Vuex);
const store = new Vuex.Store({
   state: {
      BaseURL: "http://127.0.0.1:8000",
      ApiURL: "http://127.0.0.1:8000/api",
      user: {},
   },
   getters: {

   },
   mutations: {
      LOAD_USER(state, data) {
         state.user = data;
      }
   },
   actions: {
      load_user({ commit }) {
         http().get('/auth/profile')
            .then(response => {
               commit('LOAD_USER', response.data);
            });
      }
   },


})


export default store;