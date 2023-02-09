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
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
import { required, email, max, min, confirmed, image } from 'vee-validate/dist/rules';

// No message specified.
extend('email', email);

// Override the default message.
extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: '{_field_} must be minimum {length} characters'
});
extend('max', {
  ...max,
  message: "The name must be maximum 225 character"
});

extend('confirm', {
  ...confirmed,
  message: "Password Confirmation doesn't match"
});

extend('image', {
  ...image,
  message: 'Image must be an image'
})

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.use(FlashMessage);
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
new Vue({
  store,
  router,

  render: h => h(App),
}).$mount('#app')
