<template>
  <div class="nav">
    <!-- <ul class="inch">
      <li v-for="tire in data.tires">
        {{ tire.inch }}
        <div class="navList">
        <vueli liCName="sp" spanCName="spec" divCName="tireNum" :arr="tire.contents" content="spec" content1="num">
        </vueli>
        </div>
      </li> 
    </ul -->
    <div class="navInch">
      <ul>
        <li v-for="inch in data.inches" @mouseover="updateView(inch)">
          {{ inch }}
        </li>         
      </ul>      
    </div>
    <div class="navView">
    <ul>
      <li v-for="tire in data.tires">
        {{ tire.spec}}
      </li>
    </ul>
    </div>
    
  </div>
</template>
<script>

export default {
  name: "Nav",
  data() { 
    return {
      lastClick: 0,
      currrentInch: 12,
      contents: [],
    }
  },
  computed: {
    
  },
  methods: {
    updateView(inch) {
      var i = inch;
      this.data.tires = [];
      return;
      this.ref.child('tire/' + i).once('value', snapShot => {
        var contents = [];
        let oTire = snapShot.val();
        for (let j in oTire) {
          this.ref.child('tire/' + i + '/' + j).once('value', snapShot => {
            let num = snapShot.val().num;
            let obj = { spec: j, num: num }
            this.data.tires.push(obj);
          })
        }
        /* this.data.tires.push({
          [i]: contents
        }) */
      }) 
    },
    ctlNums(behav, obj) {
      (behav == 'add') ?  obj.num++ : obj.num-- ;
      this.ref.child('tire/' + this.specs.inch + '/' + obj.spec).set({
        num: obj.num
      });
    }
  },
  mounted() {
    for (let i = 12; i <= 20; i++) {        
      this.ref.child('tire/' + i).once('value', snapShot => {
        var contents = [];
        let oTire = snapShot.val();
        for (let j in oTire) {
          this.ref.child('tire/' + i + '/' + j).once('value', snapShot => {
            let num = snapShot.val().num; 
            let obj = { spec: j, num: num } 
            contents.push(obj);   
          })
        }
        this.data.inches.push(i);
        this.data.tires.push({
          [i]: contents
        })
      })
      // 12 13'' combined
    }  
  }
}
</script>

<style lang="scss">

@import '@/assets/nav.scss';
</style>

