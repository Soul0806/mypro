<template>
  <div class="top">
    <div>
      <router-link to="/">總覽   </router-link> | 
      <router-link to="/new">新增   </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "top"
}
</script>

<style lang="scss" scoped>
.top {
  font-size: 2rem;
  display: flex;  
  justify-content: center;
  align-items:center;
  margin: 20px;
}
</style>

