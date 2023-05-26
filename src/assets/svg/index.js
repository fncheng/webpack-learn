import Vue from 'vue'
import SvgIcon from '../../components/SvgIcon'

Vue.component('SvgIcon', SvgIcon)

// 定义一个加载目录的函数
const requireAll = (r) => {
  console.log('000000000', r)
  r.keys().map(r)
}
// 批量导入svg目录下的svg文件
requireAll(require.context('./', false, /\.svg$/))

// require('./female.svg')
// require('./male.svg')
