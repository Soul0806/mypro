<template>
  <section id="overview">
    <div class="wrapper ov">
      <ul class="ov-st">
        <li class="ov-st-li" v-for="inch in inches">
          <div class="ov-st-inch"><h3>{{ inch }}</h3></div>
          <ul class="ov-nd">
            <!-- <li v-for="spec in purchases[inch]">{{ spec }}</li> -->
            <li class="ov-nd-li" v-for="tire,key in tires[inch]">
              <span class="ov-nd-spec">{{ key.replace(/-/, '/') }}</span>
              <span class="ov-nd-num" 
                :class="{ zero: ( tire.num == 0) }">
                {{ tire.num }}
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section> 
</template>
<script>

export default {
  name: 'Overview',
  data() {
    return {
      tires: [],
    }
  },
  computed: {
  },
  mounted() {   
    this.inches = _.range(12, 21);
    this.db_tires().once('value', v => {
      this.tires = v.val();
    });
  }
}
</script>
<style lang="scss">
@import '@/assets/overview.scss';
</style>
