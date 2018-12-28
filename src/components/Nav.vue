<template>
  <header>
    <nav>
      <div class="wrapper">
        <ul>
          <li v-for="tab in tabs">
            <router-link 
              :to="tab.link"
            >
            {{ tab.name.ch }}</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Top",
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
@import '@/assets/nav.scss';
</style>

