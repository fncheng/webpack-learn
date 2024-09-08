<template>
  <div>
    <h3 @click="gotoMicroApp">About</h3>
    <button @click="redirectAbout">Redirect</button>
    <button @click="handleEventBus">EventBus</button>
    <div id="subapp-container"></div>
    <async-component :count="count"></async-component>
  </div>
</template>

<script>
// import service from '@/api/index'
import EventBus, { handleEvent } from '@/store/eventbus'
import AsyncComponent from '../components/AsyncComponent.vue'

let MAX_LENGTH = 100
export default {
  name: 'About',
  components: { AsyncComponent },
  beforeRouteEnter(to, from, next) {
    console.group('beforeRouteEnter', from, to)
    next((vm) => {
      console.log(vm)
    })
  },
  data() {
    return {
      msg: 'about',
      count: 100
    }
  },
  created() {
    EventBus.$on('message', handleEvent)
    console.log(MAX_LENGTH)
  },
  mounted() {},

  beforeDestroy() {
    EventBus.$off('message', handleEvent)
    console.log('销毁EventBus')
    MAX_LENGTH = null
  },

  methods: {
    gotoMicroApp() {
      this.$router.push('/about/app-vue')
    },
    redirectAbout() {
      this.$router.push('/about')
    },
    handleEventBus() {
      EventBus.$emit('message', { someData: 123 })
    }
  }
}
</script>

<style scoped>
.about {
  background-color: aqua;
}
</style>
