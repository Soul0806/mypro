<template>
  <div class="top">
    <div class="top-nav">
      <ul>
        <li v-for="tab in tabs">
          <router-link 
            :to="tab.link"
          >
          {{ tab.name.ch }}</router-link>
        </li>
      </ul>
     <!--  <ul>
        <li>
          <router-link to="/" 
           :class="{ active: isActive('overview') }"> 
          總覽</router-link>
        </li> 
        <li>
          <router-link to="/new" 
           :class="{ active: isActive('insert') }"> 
          新增 </router-link>
        </li>        
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      tabs: [
        { name: { en: 'overview', ch: '總覽'} , link: '/' }, 
        { name: { en: 'guide', ch: '導覽' }   , link: '/guide' }, 
        { name: { en: 'insert', ch: '新增' }  , link: '/insert' }],
      currentTab: 'overview',
    }
  },
  methods: {
  }  
}
</script>
<style lang="scss" scoped>
@import '@/assets/top.scss';
</style>

