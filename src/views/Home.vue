<template>
  <div>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-female"></use>
    </svg>
    <svg-icon :name="'male'" />
    <svg-icon name="female" />
  </div>
</template>

<script>
import SvgIcon from '../components/SvgIcon.vue'
export default {
  components: { SvgIcon },
  created() {
    console.log('devtool1')
    console.log('devtool2')
    console.log('devtool3')
  },
  mounted() {
    console.log('mounted1')
  }
}
</script>

<style></style>
