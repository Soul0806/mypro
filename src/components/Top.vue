<template>
  <div class="top">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item active">
            <router-link to="/">總覽 </router-link>
          </li> 
          <li class="nav-item">
            <router-link to="/new">新增 </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "top"
}
</script>
<style lang="scss" scoped>
@import '@/assets/top.scss';
</style>

