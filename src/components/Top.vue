<template>
  <div class="top">
    <div>
      <ul>
        <li @click="active('overview')">
          <router-link to="/" 
          :class="{ active: isActive('overview') }"
          >總覽 </router-link>
        </li> 
        <li @click="active('insert')">
          <router-link to="/new" 
          :class="{ active: isActive('insert') }"
          >新增 </router-link>
        </li>
        new
      </ul>
    </div>
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

