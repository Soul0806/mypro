<template>
  <div id="app">
    <router-view  name="top"/>
    <router-view/>
    <!-- <test></test> -->
  </div>
</template>

<script>
// import test from '@/components/test'

export default {
  name: 'App',
  components: {
    //test
  }
}
</script>

<style lang="scss">
.header {
  text-align: center;
  margin-top: 10px;
}
a {
  padding: 0px 10px;
}
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css); 
</style>
