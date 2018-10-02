<template>
  <div class="top">
    <router-link to="/">總覽   </router-link> | 
    <router-link to="/new">新增   </router-link>
  </div>
</template>

<script>
export default {
  name: "top"
}
</script>

<style lang="scss" scoped>
.top {
  text-align: center;
  margin-top: 10px;
    a {
    padding: 0px 10px;
    }
}
</style>

