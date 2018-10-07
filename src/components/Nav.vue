<template>
  <div class="nav">
    <ul class="inch">
      <li v-for="tire in data.tires">
        {{ tire.inch }}
        <div class="navList">
        <vueli liCName="sp" spanCName="spec" divCName="tireNum" :arr="tire.contents" content="spec" content1="num">
        </vueli>
        </div>
      </li> 
    </ul> 
  </div>
</template>
<script>

export default {
  name: "Nav",
  data() { 
    return {
      lastClick: 0,
      inchRange: [],
      contents: []
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
    },
    test() {
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
        this.data.tires.push({
          inch: i,
          contents: contents
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

