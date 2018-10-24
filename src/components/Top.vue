<template>
  <div class="top">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item" @click="active('overview')">
            <router-link to="/" 
            :class="{ active: isActive('overview') }"
            >總覽 </router-link>
          </li> 
          <li class="nav-item" @click="active('insert')">
            <router-link to="/new" 
            :class="{ active: isActive('insert') }"
            >新增 </router-link>
          </li>
          new
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      currentTab: 'overview'
    }
  },
  methods: {
    active(tab) {
      this.currentTab = tab;
    },
    isActive(tab) {
      
      return this.currentTab == tab ? true : false; 
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/top.scss';
</style>

