<template>
  <div id="app">
    <div id="nav">
      <h1>Hello Webpack</h1>
      <div>
        <span class="title">Webpack打包sass2221211</span>
      </div>
      <div class="container">1</div>
      <div class="container bg-blue">2</div>
      <div class="container bg-red">2</div>
      <div>
        <img src="@/assets/images/mcd.jpeg" alt="" />
      </div>
      <div>
        <img src="@/assets/images/home.png" alt="" />
      </div>
      <div>
        <img src="@/assets/images/401.gif" alt="" />
      </div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <HelloWorldVue />
    </div>
    <router-view />
  </div>
</template>
<script>
import HelloWorldVue from './HelloWorld.vue'
import { num } from './use'
export default {
  components: {
    HelloWorldVue
  },
  data() {
    return {
      obj: {
        a: 'a'
      }
    }
  },
  created() {
    console.log(this.obj.b?.c ?? 0)
    console.log('name', name)
    console.log('num in App', num)
    console.log('process', process.env.VERSION)
  }
}
</script>

<style scoped>
.bg-red {
  background-color: red;
}
</style>
<style lang="scss" scoped>
#nav {
  background-color: antiquewhite;
}
.title {
  font-size: 24px;
  font-weight: 600;
  display: flex;
}
</style>
