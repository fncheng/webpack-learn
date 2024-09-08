import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import '@/router/asyncRoutes'
import './index.scss'
import './index.css'
import './assets/svg/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import { registerMicroApps, start } from 'qiankun'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.config.devtools = true

// registerMicroApps([
//   {
//     name: 'sub-app-vue',
//     entry: '//localhost:7100',
//     container: '#subapp-container',
//     activeRule: '/about/app-vue'
//   },
//   {
//     name: 'sub-app-react',
//     entry: '//localhost:7200',
//     container: '#subapp-container',
//     activeRule: '/app-react'
//   }
// ])

// start()

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
