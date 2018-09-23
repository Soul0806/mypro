import Vue from 'vue'

import Router from 'vue-router'
import container from '@/components/container'
import login from '@/components/login'
import firebase from 'firebase'

Vue.use(Router)

let router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      name: 'Container',
      component: container,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser) next ('login') 
  else if (!requiresAuth && currentUser) next ('/')
  else next()
})

export default router


