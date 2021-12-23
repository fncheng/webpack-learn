import Vue from 'vue'
import App from './App.vue'
import './index.scss'
import './index.css'
import { num } from './use'
import splitChunk from './splitChunk'
console.log('splitChunk: ', splitChunk)
console.log('num', num)
console.log(33333)
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
