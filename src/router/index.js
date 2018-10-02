import Vue from 'vue'

import Router from 'vue-router'
//import container from '@/components/container'
import top from '@/components/top'
import login from '@/components/login'
import menu from '@/components/menu'
import nav from '@/components/nav'

import firebase from 'firebase'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      name: 'nav',
      components: {
        default: nav,
        top: top
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new',
      name: 'new',
      components: {
        default: menu,
        top: top
      },
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


