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
console.log('process.env.routerBase', process.env.routerBase);
const router = new VueRouter({
  mode: 'history',
  base: process.env.routerBase,
  routes: syncRoutes
})

export default router
