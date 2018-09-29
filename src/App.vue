<template>
  <div id="app">
    <div class="header">
      <router-link to="/">總覽   </router-link> | 
      <router-link to="/new">新增   </router-link>
    </div>
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
