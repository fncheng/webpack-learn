<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
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
    init() {
    }
  }
})
</script>

<style></style>
