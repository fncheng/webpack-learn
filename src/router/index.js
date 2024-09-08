/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const syncRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  // {
  //   path: '/about/*',
  //   name: 'About',
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/jsx',
    name: 'JSX',
    component: () => import('../views/jsx.vue'),
  },
]
console.log('process.env.routerBase', process.env.routerBase)
const router = new VueRouter({
  mode: 'history',
  base: process.env.routerBase,
  routes: syncRoutes,
})

router.beforeEach((to, from, next) => {
  console.group('beforeEach,路由跳转前触发')
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach,路由跳转后触发')
})

export default router
