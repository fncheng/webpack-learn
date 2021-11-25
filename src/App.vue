<template>
  <div id="app">
    <div id="nav">
      <h1>Hello Webpack</h1>
      <div>
        <span class="title">Webpack打包sass2221211</span>
      </div>
      <div class="container">1</div>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      obj: {
        a: 'a'
      }
    }
  },
  created() {
    console.log(this.obj.b?.c ?? 0);
  }
}
</script>

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
