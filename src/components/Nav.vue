<template>
  <div class="nav">
    <ul>
      <li tabindex="-1" v-for="inch in inches.range" 
        @click="active(inch),specs.inch = inch">
        {{ inch }}
      </li>
    </ul>
    <div class="navList">
      <ol>
        <li class="sp" v-for="tire in data.tires" >
        <span class="spec">{{ tire.spec }}</span>
          <span class="ctlButton">
            <button class="add" @click="ctlNums('add', tire)"> + </button>
            <div class="tireNum">{{ tire.num }}</div>
            <button class="substract" @click="ctlNums('substract', tire)"> - </button>
          </span>
        </li>
      </ol>
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

