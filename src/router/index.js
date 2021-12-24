import Vue from 'vue'
import VueRouter from 'vue-router'
import { getRoutes } from '../api/home'

Vue.use(VueRouter)
// eslint-disable-next-line
let webRoutes = []
async function initRoutes() {
  let res = await getRoutes()
  if (res.status === 200) {
    console.log(res.data.data)
    webRoutes = res.data.data
    return res.data.data
  }
}

// eslint-disable-next-line
async function handleAsyncRoutes() {
  return await initRoutes().map((route) => ({
    path: route.path,
    name: route.name,
    component: () => import(`@/views/${route.component}`)
  }))
}

initRoutes()
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.routerBase,
  routes
  // routes: asyncRoutes
})

export default router
