<template>
  <div class="nav">
    <ul>
      <li tabindex="-1" v-for="inch in inches.range" 
        @click="active(inch),specs.inch = inch">
        {{ inch }}
      </li>
    </ul>
    <div class="navList">
      <vueli liCName="sp" spanCName="spec" divCName="tireNum" :arr="data.tires" content="spec" content1="num"></vueli>
    </div>
  </div>
</template>
<script>

export default {
  name: "Nav",
  data() { 
    return {
      lastClick: 0,
      inches: { range:[] }
    }
  },
  computed: {
    
  },
  methods: {
    ctlNums(behav, obj) {
      (behav == 'add') ?  obj.num++ : obj.num-- ;
      this.ref.child('tire/' + this.specs.inch + '/' + obj.spec).set({
          num: obj.num
        });
    }
  },
  mounted() {
    var tempInchRange = [];
    for (let i = 12; i <= 18; i++) {
      tempInchRange.push(i);
    }
    this.inches.range = tempInchRange;
  }
}
</script>

<style lang="scss">
@import '@/assets/nav.scss';
</style>

