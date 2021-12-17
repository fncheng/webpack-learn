import Vue from 'vue'
import App from './App.vue'
import './index.scss'
import './index.css'
import { num } from './use'
console.log('num', num)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
