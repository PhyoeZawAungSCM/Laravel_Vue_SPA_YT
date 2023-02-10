import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './assets/css/styles.css'
import './assets/js/scripts.js'
import VueRouter from 'vue-router'
import router from './routers/router.js';
import store from '@/store/index';


import FlashMessage from '@smartweb/vue-flash-message';
import { ValidationProvider,ValidationObserver } from 'vee-validate';
// import { required, email, max, min, confirmed, image } from 'vee-validate/dist/rules';


// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

import '@/services/validation.js';
Vue.use(FlashMessage);
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
const vm = new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

export {vm};