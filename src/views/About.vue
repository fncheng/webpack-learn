<script>
// import service from '@/api/index'
export default {
  name: 'About',
  created() {
    // service
    //   .get('/about', {
    //     headers: {
    //       'uah-mdn': '123'
    //     }
    //   })
    //   .then((res) => {
    //     console.log(res)
    //   })
  },
  render() {
    return <div class={'about'}>This is About</div>
  }
}
</script>

<style scoped>
.about {
  background-color: aqua;
}
</style>
