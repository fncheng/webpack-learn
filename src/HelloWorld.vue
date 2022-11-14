<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
    <button @click="handleClick">Click me!</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HelloWorld',
  data() {
    return {
      list: [1, 2, 3],
      msg: 'msg'
    }
  },
  created() {
    this.list.push(111)
  },
  methods: {
    init() {},
    handleClick() {
      this.$emit('myClick', 123, 'code0')
    }
  }
})
</script>

<style></style>
