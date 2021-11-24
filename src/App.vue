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
  created() {
    console.log(VERSION);
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
