<template>
  <div>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-female"></use>
    </svg>
    <svg-icon :name="'male'" />
    <svg-icon name="female" />
    <div>
      <button @click="asyncComponentShow = true">加载异步组件</button>
      <async-component v-if="asyncComponentShow"></async-component>
    </div>
    <div>
      <el-input v-model="msg"></el-input>
    </div>
  </div>
</template>

<script>
const AsyncComponent = () =>
  import(/* webpackChunkName: "AsyncComponent" */ '../components/AsyncComponent.vue')
import SvgIcon from '../components/SvgIcon.vue'
import { Input } from 'element-ui'
export default {
  components: { SvgIcon, AsyncComponent, ElInput: Input },
  data() {
    return {
      asyncComponentShow: false,
      msg: ''
    }
  },
  created() {
    console.log('devtool1')
    console.log('devtool2')
    console.log('devtool3')
  },
  mounted() {
    console.log('mounted1')
  },
  methods: {
    loadComponent() {}
  }
}
</script>

<style></style>
