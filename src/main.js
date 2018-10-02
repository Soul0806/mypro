// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import { store } from './store.js'
import firebase from 'firebase'

import regular from '@/regular.js'
Vue.mixin(regular);

const fb = require('./db.js')
import '@/assets/main.scss'

//const axios = require('axios');
//Vue.config.productionTip = false
/* eslint-disable no-new */
import defineElements from '@/defineElements.js'
const vueli = defineElements.vueli;
Vue.component('vueli', vueli);

let app;
// Initialize Firebase
/* var config = {
  apiKey: "AIzaSyA0hCFocCA9j-_hugnX3tNU82kvpKSb7Bs",
  authDomain: "myproject-68a05.firebaseapp.com",
  databaseURL: "https://myproject-68a05.firebaseio.com",
  projectId: "myproject-68a05",
  storageBucket: "myproject-68a05.appspot.com",
  messagingSenderId: "261190786683"
};
firebase.initializeApp(config);
 */
/* firebase: {
  books: booksRef
} */
fb.auth.onAuthStateChanged(function(user) {
  if(!app) {
   app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
   })   
  }
});

