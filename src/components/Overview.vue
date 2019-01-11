<template>
  <section id="overview">
    <div id="ov-inch">
      <ul>
        <li v-for="inch in inches"><a :href="`#${inch}`">{{ inch }}</a></li>
      </ul>
    </div>
    <div id="ov-tire" class="wrapper ov">
      <ul class="ov-tire-st">
        <li class="ov-tire-st-li" v-for="inch in inches">
          <div :id="inch" class="ov-tire-st-inch" @click="reset"><h3>{{ inch }}</h3></div>
          <template>
            <ul class="ov-tire-nd">
              <li class="ov-tire-nd-li" v-for="tire,spec in tires[inch]"
                  @click="operate(inch, spec)"
                  v-if="check(inch, spec)">
                <span class="ov-tire-nd-spec">{{ spec.replace(/-/, '/') }}</span>
                <span class="ov-tire-nd-num" 
                  :class="{ zero: ( tire.num == 0) }">
                  {{ tire.num }}
                </span>
              </li>
            </ul>
          </template>
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
      operateInch: '',
      operateSpec: ''
    }
  },
  computed: {
  },
  methods: {
    operate(inch, spec) {
      this.operateInch = inch;
      this.operateSpec = spec;
    },
    check(inch, spec) {
      var flag = this.operateInch == inch && this.operateSpec == spec;
      if(this.operateInch == '' || this.operateInch != inch || flag) 
        return true;
      return false;
    },
    reset() {
      this.operateInch = this.operateSpec = '';
    }
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
