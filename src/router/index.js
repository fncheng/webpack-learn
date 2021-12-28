/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)



const syncRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.routerBase,
  routes: syncRoutes
})

export default router
