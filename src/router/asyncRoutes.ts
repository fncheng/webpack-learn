import router from './index'
import { getRoutes } from '../api/home'

type routeConfig = {
  path: string
  name: string
  component: () => object
}

let asyncRoutes: Array<routeConfig> = []
let webRoutes: Array<routeConfig> = []
async function initRoutes() {
  let res = await getRoutes()
  if (res.status === 200) {
    console.log(res.data.data)
    webRoutes = res.data.data
    return res.data.data
  }
}

// // eslint-disable-next-line
async function handleAsyncRoutes() {
  let asyncRouteMap = await initRoutes()
  console.log('asyncRoutes: ', asyncRouteMap)
  asyncRoutes = asyncRouteMap.map((route: routeConfig) => ({
    path: route.path,
    name: route.name,
    component: () => import(`@/views/${route.component}`)
  }))
  asyncRoutes.forEach((routeConfig) => {
    if (routeConfig.name !== 'Home') {
      router.addRoute(routeConfig)
    }
  })
}

handleAsyncRoutes()
