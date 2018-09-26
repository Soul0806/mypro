<template>
  <div class="container">
    <div class="nav">
        <div class="wrap">
          <ul>
            <li v-for="inch in inches.range" 
                :class="{ active: isActive(inches,inch) }" 
                @click="active(inches,inch), specs.inch = inch">
             {{ inch }}
            </li>
          </ul>
        </div>
    </div>
    <div class="selectSection">
      <div class="cap tireWitdh" @click="ctlWidth = !ctlWidth">
        胎寬
      </div>
      <ul v-if="ctlWidth">
        <li v-for="tireWidth in tireWidthRange.range"
            :class="{ active: isActive(tireWidthRange, tireWidth) }"
            @click="active(tireWidthRange, tireWidth), specs.width = tireWidth">
            {{ tireWidth }}
        </li>
      </ul>
      <div class="cap tireHeight" @click="ctlHeight = !ctlHeight">
        胎高
      </div>
      <ul v-if="ctlHeight">
        <li class="tireHeightLi" 
            v-for="tireHeight in tireHeightRange.range"
            :class="{ active: isActive(tireHeightRange, tireHeight) }"
            @click="active(tireHeightRange, tireHeight), specs.height = tireHeight">
          {{ tireHeight }}
        </li>
      </ul>
      <div class="inputSection">
        <input type="text" v-model="specs.width">   
        <span v-if="specs.height">
          <span> / </span> <input type="text" v-model="specs.height">
        </span>
        <span> - </span>
        <input type="text" v-model="specs.inch">
        <button @click="check">確認</button>
        <button @click="clean">clean</button>
      </div>
      <div class="viewSection">
        <ul>
          <li v-for="inch in inches.range"
            :class="{ active: isActive(inches,inch) }"
            @click="active(inches,inch), specs.inch = inch">
            {{ inch }}
          </li>
        </ul>
      </div>  
      <div class="list">
        <ol>
          <li class="sp" v-for="tire in data.tires" >
            <div class="specs" @mouseover="">{{ tire.spec }}</div>
            <span class="ctlButton">
              <button class="add"> + </button>
              <div class="tireNum">{{ tire.num }}</div>
              <button class="substract"> - </button>
            </span>
          </li>
          
        </ol>
      </div>
    </div>
    <div class="logout">
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>

//import db from 'firebase'
const db = require('../db.js').db;
const auth = require('../db.js').auth;
const ref = db.ref();
const tires = db.ref('tires/');

const axios = require('axios');
export default {
  name: 'Home',
  data () {
    return {
      ctlWidth: true,
      ctlHeight: true,
      data:{  tempInch: [], inches: [], tires: [] },
      specs: { width:'', height:'', inch:'' },
      selected: false,
      inches: { range:[], current:'' },
      tireWidthRange: { range:{}, current:'' },
      tireHeightRange: { range:{}, current:'' },
    }
  },
  methods: {
    a() {
      console.log(123);
    },
    active(obj,key) {
      obj.current = key;
      this.data.tires = [];
      ref.child('tire/' + key).once('value', snapShot => {
        let oTire = snapShot.val();
        for (let k in oTire) {
          ref.child('tire/' + key + '/' + k).once('value', snapShot => {
            let num = snapShot.val().num;
            let obj = { spec:k, num: num };
            this.data.tires.push(obj); 
          })
        }
      })
    },
    isActive(obj,key) {
      return obj.current == key ? true : false       
    },
    assemble(obj, arr) {
      obj.range = arr;
    },
    check() {
      var inch     = this.specs.inch;
      var width    = this.specs.width;
      var height   = this.specs.height;
      var tempInch = this.data.tempInch;
      var updates  = {};

      var  tireSpecs = width;
      if(height != '') {
        tireSpecs += '-' + height
      }
      tireSpecs += '-' + inch;

      var targetInch = 'tire/' + inch ;
      var targetSpecs = 'tire/' + inch + '/' + tireSpecs;
 
      if(  inch == '' || 
          (width == '' && height == '')) {
        alert('invalid input');
        return;
      }
      tempInch.push(inch);
      ref.child(targetInch).once('value', snapShot => {
        if (snapShot.exists()) {
          console.log(123);
          ref.child(targetSpecs).once('value', snapShot => {
            if (snapShot.exists()) {
              alert('exists');
            } else {
              ref.child(targetSpecs).set( {num: 1})
              this.data.tires.push(tireSpecs);
              this.specs.height = '';
            }
          })
        } else {
          ref.child(targetSpecs).set( {num: 1} )
          ref.child('tire/inches').set( [tempInch] )
          this.data.tires.push(tireSpecs);
          this.specs.height = ''
        }
      })
    },
    clean() {
      this.specs.inch = '';
      this.specs.width = '';
      this.specs.height = '';
      this.inches.current = '';
      this.tireWidthRange.current = '';
      this.tireHeightRange.current = '';
    },
    logout() {
      auth.signOut().then(() => {
        this.$router.replace('login');
      })
    }
  },
  mounted() {
    var tempWidthRange = [],
        tempHeightRange = [],
        tempInchRange = [];

    for (let i = 155; i <= 325; i += 10) {     
      tempWidthRange.push(i);
    }
    for (let i = 30; i <= 75; i += 5) {
      tempHeightRange.push(i);
    }
    for (let i = 12; i <= 18; i++) {
      tempInchRange.push(i);
    }
    
    this.assemble(this.tireWidthRange, tempWidthRange)
    this.assemble(this.tireHeightRange, tempHeightRange)
    this.assemble(this.inches, tempInchRange)

    ref.child('tire/inches').once('value',snapShot => {
        let oInches = snapShot.val();
        if( oInches != null) {
          Object.keys(oInches).map( (key) => {  this.data.tempInch = oInches[key]; })
        }
      }) 
    
      ref.child('tire').once('value', snapShot => {
        let oTire = snapShot.val();
        for(let key in oTire) {
          ref.child('tire/' + key).once('value', snapShot => {
            let oTire = snapShot.val();
              for (let key in oTire) {              
                //this.data.tires.push(key);
              } 
              //this.data.tires.pop();     
          })
        }
        //Object.keys(oTire).map( (key) => {  console.log(oTire[key]); })
      })
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
