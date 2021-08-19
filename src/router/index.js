import Vue from 'vue'
import VueRouter from 'vue-router'
import middleware from '../middleware'
import store from '../store'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/buyframe',
    name:'buyframe',
    component: () => import('../components/BuyActionIframe.vue')
  },
  {
    path:'/swap',
    name:'swap',
    component: () => import('../views/Swap.vue')
  },
  {
    path:'/coin',
    name:'coin',
    component: () => import('../views/Coin.vue')
  },
  {
    path:'/market',
    name:'market',
    component: () => import('../views/Market.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    meta: { middleware: [ middleware.authCheck ] },
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { middleware: [ middleware.guest ] },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { middleware: [ middleware.guest ] },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/splash',
    name: 'splash',
    component: () => import('../views/Splash.vue')
  },
  { path: '*', name: 'home', component: Home }
]

const router = new VueRouter({ mode:'hash', base: process.env.BASE_URL, routes })

function nextFactory(context, middleware, index) {
  const nextMiddleware = middleware[index];
  if(!nextMiddleware) return context.next
  return () => {
    const nextPipeline = nextFactory(context, middleware, index+1)
    nextMiddleware({...context, next: nextPipeline})
  }
}

router.beforeEach((to,from,next) => {
  if(!to.meta.middleware) return next()
  const middleware = to.meta.middleware
  const context = { to, from, next, store }
  return middleware[0]({...context, next: nextFactory(context, middleware, 1)})
})

export default router
