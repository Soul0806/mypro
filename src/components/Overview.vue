<template>
  <section id="overview">
    <div id="ov-inch">
      <ul>
        <li v-for="inch in inches"><a :href="`#${inch}`">{{ inch }}</a></li>
      </ul>
    </div>
    <div id="ov-tire" class="wrapper ov"  @click="reset">
      <!-- <input type="file" @change="test"> -->
      <div>Total: {{ tireSum }}</div>
      <ul class="ov-tire-st">
        <li class="ov-tire-st-li" v-for="inch in inches">
          <div :id="inch" class="ov-tire-st-inch"><h3>{{ inch }}</h3></div>
          <template>
            <ul class="ov-tire-nd">
              <li class="ov-tire-nd-li" v-for="tire,spec in tires[inch]"
                  @click.stop="operate(inch, spec, tire.num)"
                  v-if="check(inch, spec)">
                <span class="ov-tire-nd-spec">{{ spec.replace(/-/, '/') }}</span>
                <span class="ov-tire-nd-num"
                  :class="{ zero: ( tire.num == 0) }">
                  {{ tire.num }}
                </span>
              </li>
              <operate-button class="li-operate"
                  :itshow=" operateNum > 0" 
                  :act="opActive(inch)"
                  @change="changenum"
                  ></operate-button>
            </ul>
          </template>          
        </li>
      </ul> 
    </div>
  </section> 
</template>
<script>
var operateButton = {
  template: 
  `<li v-if="act">
    <button @click.stop="test('plus')" id="plus">+</button>
    <button v-if="itshow" @click.stop="test('take')" id="take">-</button>
  </li>`,
  props: [ 'act', 'itshow' ],
  data() {
    return {
    }
  },
  methods: {
    test(act) { 
      this.$emit('change', act);
    }
  }
}
export default {
  name: 'Overview',
  components: { operateButton
  },
  data() {
    return {
      operateInch: '',
      operateSpec: '',
      operateNum: 0,
      operateActive: false,
      tireSum: 0
    }
  },
  computed: {
  },
  methods: {
    changenum(act) {
      var inch = this.operateInch;
      var spec = this.operateSpec;
      var targetSpecs = `${inch}/${spec}`;
      if(act == 'plus') {
        this.db_tires(targetSpecs).set({ num: ++this.tires[inch][spec].num });       
        this.tireSum++;
      } else {
        this.db_tires(targetSpecs).set({ num: --this.tires[inch][spec].num });
        this.tireSum--
      }
      this.operateNum = this.tires[inch][spec].num;
    },
    opActive(inch) {
      if(this.operateInch == inch) 
        return true;
      return false;
      //if(!this.operateInch) return false;      
    },
    test() {
      var self = this;
      const input = event.target;
      const reader = new FileReader();      
      reader.onload = function() {
        console.log(self);
        const outerArr = reader.result.split('\n').map((line) => {
        return line.split(',');
      })
      var obj = {};
      self.ref.set({ 'mytires': obj }); 
      outerArr.map((innerArr) => {
        innerArr.map((val) => {
            if(!val) { return; }
            var newVal = val.replace(/\//, '-').trim();  
            var inch = newVal.trim().slice(-2);                     
            if(!obj.hasOwnProperty(inch)) {
              obj[inch] = { [newVal]: { num: 0 } }; 
            } else {
              if(!obj[inch].hasOwnProperty(newVal)) {
                obj[inch][newVal] = { num: 0 };
              }
            }
        })
      })
      self.ref.set( { mytires: obj } );
      }
      reader.readAsText(input.files[0]);
    },
    operate(inch, spec, num) {
      if(this.operateActive == true && this.operateInch != inch) this.reset();
      this.operateInch = inch;
      this.operateSpec = spec;
      this.operateNum = num;
      this.operateActive = true; 
      /* var buttonPlus = this.ctElem({ elem: 'button', text: '+', id: 'plus'} );
      var buttonTake = this.ctElem({ elem: 'button', text: '-', id: 'take'} );
      var targetParentNode = event.currentTarget.parentNode; */
      //targetParentNode.append(buttonPlus, buttonTake);
     /*  var targetSpecs = inch + '/' + spec;      
      this.clickEvent(buttonPlus, () => { 
        this.db_tires(targetSpecs).set({ num: ++this.tires[inch][spec].num });
        this.tireSum++;
        event.stopPropagation();
      })
      this.clickEvent(buttonTake, () => { 
        this.db_tires(targetSpecs).set({ num: --this.tires[inch][spec].num });
        this.tireSum--;
         event.stopPropagation (); 
      })*/
      
    },
    check(inch, spec) {
      var flag = this.operateInch == inch && this.operateSpec == spec;
      if(this.operateInch == '' || this.operateInch != inch || flag) 
        return true;
      return false;
    },
    reset() {
      this.operateInch = this.operateSpec = '';
      if(this.operateActive == true) {
        document.getElementById('plus').remove();
        if(this.operateNum > 0)
          document.getElementById('take').remove();
      }
      this.operateActive = false;
    },
    clickEvent(elem, func) {
      elem.addEventListener('click', func);
    }
  },
  mounted() {   
    this.inches = _.range(12, 21);
    this.db_tires().once('value', v => {
      this.tires = v.val();
      var arraySum = [];
      Object.values(this.tires).forEach((e) => {
        arraySum = arraySum.concat( Object.values(e).map(b => b.num) );
      })
      this.tireSum = arraySum.reduce((a,b) => a + b )
    });
  }
}
</script>
<style lang="scss">
@import '@/assets/overview.scss';
</style>
