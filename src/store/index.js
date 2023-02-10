import Vuex from 'vuex';
import Vue from 'vue';
import category from './modules/category';
import product from './modules/product';
import Auth from './modules/Auth';
Vue.use(Vuex);
const store = new Vuex.Store({
   state: {
      BaseURL: "http://127.0.0.1:8000",
      ApiURL: "http://127.0.0.1:8000/api",    
   },
   modules:{
      category,
      product,
      Auth,
   }
})


export default store;