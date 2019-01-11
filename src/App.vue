<template>
  <div id="app" >
    <router-view  name="nav"/>
    <router-view/>
    <!-- <test></test> -->
  </div>
</template>

<script>
// import test from '@/components/test'

export default {
  name: 'App',
  methods: {
  }
}
</script>

<style lang="scss">
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css); 
</style>
