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
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/jsx">JSX</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      obj: {
        a: 'a'
      },
      msg: ''
    }
  },
  methods: {}
}
</script>

<style>
.bg-red {
  background-color: red;
}
</style>
<style lang="scss">
#nav {
  background-color: antiquewhite;
}
.title {
  font-size: 24px;
  font-weight: 600;
  display: flex;
}
</style>
