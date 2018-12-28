import Vue from 'vue'

import Router from 'vue-router'
//import container from '@/components/container'
import nav from '@/components/nav'
import login from '@/components/login'
import overview from "@/components/overview";
import insert from '@/components/insert'
import guide from "@/components/guide";

import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/",
      name: "overview",
      components: {
        default: overview,
        nav: nav
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/guide",
      name: "guide",
      components: {
        default: guide,
        nav: nav
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/insert",
      name: "insert",
      components: {
        default: insert,
        nav: nav
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: login
    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser) next ('login') 
  else if (!requiresAuth && currentUser) next ('/')
  else next()
})

export default router


