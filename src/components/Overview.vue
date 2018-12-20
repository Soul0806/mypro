<template>
  <div class="overview">
    <div class="overview-list ol">
      <ul class="ol-st">
        <li class="ol-st-li" v-for="inch in inches">
          <div class="ol-st-inch"><h3>{{ inch }}</h3></div>
          <ul class="ol-nd">
            <!-- <li v-for="spec in purchases[inch]">{{ spec }}</li> -->
            <li class="ol-nd-li" v-for="tire,key in tires[inch]">
              <span class="ol-nd-spec">{{ key.replace(/-/, '/') }}</span>
              <span class="ol-nd-num" 
                :class="{ zero: ( tire.num == 0) }">
                {{ tire.num }}
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Overview',
  data() {
    return {
      tires: []
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
