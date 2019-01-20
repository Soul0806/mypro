<template>
  <header>
    <nav>
      <div class="wrapper">
        <ul>
          <li v-for="tab in tabs"
            :class="{ active: tabActive(tab) }">
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
        { name: { en: 'overview', ch: '總覽'} , link: '/overview' },
        //{ name: { en: 'guide', ch: '導覽' }   , link: '/guide/home' }, 
        //{ name: { en: 'insert', ch: '新增' }  , link: '/insert' }
      ],
    }
  },
  computed: {
  },
  methods: {
    tabActive(tab) {
      return this.$route.name == tab.link.match(/\w+/)[0];
    }
  },
  updated() {
  },
  mounted() {
    
  }  
}
</script>
<style lang="scss" scoped>
@import '@/assets/nav.scss';
</style>

