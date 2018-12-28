<template>
  <div class="menu">
    <div class="tireWidth">
      胎寬
      <input id="toggle" type="checkbox">
      <label for="toggle"></label>   
      <ul>
        <li tabindex="-1" v-for="tireWidth in tireWidthRange.range"
            @click="specs.width = tireWidth">
            {{ tireWidth }}
        </li>
      </ul>
    </div>
    <div class="tireHeight">
      胎高
      <input id="togglee" type="checkbox">
      <label for="togglee"></label>
      <ul>
        <li tabindex="-1" class="tireHeightLi" 
            v-for="tireHeight in tireHeightRange.range"
            @click="specs.height = tireHeight">
          {{ tireHeight }}
        </li>
      </ul>
    </div>
    <div class="inputSec">
      <input type="text" v-model="specs.width">
      <span v-if="specs.height">
        <span> / </span> <input type="text" v-model="specs.height">
      </span>
      <span> - </span>
      <input type="text" v-model="specs.inch">
      <button @click="check()">確認</button>
      <button @click="clean()">clean</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tireWidthRange: { range: [], current: '' },
      tireHeightRange: { range: [], current: '' }
    }
  },
  methods: {
    check() {
      var inch = this.specs.inch;
      var width = this.specs.width;
      var height = this.specs.height;
      var tempInch = this.data.tempInch;
      var updates = {};

      var tireSpecs = width;
      if (height != '') {
        tireSpecs += '-' + height
      }
      tireSpecs += '-' + inch;

      var targetInch = 'tire/' + inch;
      var targetSpecs = 'tire/' + inch + '/' + tireSpecs;

      if (inch == '' ||
        (width == '' && height == '')) {
        alert('invalid input');
        return;
      }
      tempInch.push(inch);
      this.ref.child(targetInch).once('value', snapShot => {
        if (snapShot.exists()) {
          this.ref.child(targetSpecs).once('value', snapShot => {
            if (snapShot.exists()) {
              alert('exists');
            } else {
              this.ref.child(targetSpecs).set({ num: 1 })
              this.data.tires.push(tireSpecs);
              this.specs.height = '';
            }
          })
        } else {
          this.ref.child(targetSpecs).set({ num: 1 })
          this.ref.child('tire/inches').set([tempInch])
          this.data.tires.push(tireSpecs);
          this.specs.height = ''
        }
      })
    },
    clean() {
      this.specs.inch = '';
      this.specs.width = '';
      this.specs.height = '';
    }
  },
  computed: {

  },
  mounted() {
    for (let i = 155; i <= 325; i += 10) {
      this.tireWidthRange.range.push(i);
    }
    for (let i = 30; i <= 75; i += 5) {
      this.tireHeightRange.range.push(i);
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/menu.scss';
</style>

