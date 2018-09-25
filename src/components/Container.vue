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
      <div class="cap tireWitdh">
        胎寬
        <button>clear</button>
      </div>
      <ul>
        <li v-for="tireWidth in tireWidthRange.range"
            :class="{ active: isActive(tireWidthRange, tireWidth) }"
            @click="active(tireWidthRange, tireWidth), specs.width = tireWidth">
            {{ tireWidth }}
        </li>
      </ul>
      <div class="cap tireHeight">
        胎高
        <button @click="specs.height = '', tireHeightRange.current = 0">clear</button>
      </div>
      <ul>
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
      <div class="view">
        <ul >
          <li v-for="inch in inches.range"
            :class="{ active: isActive(inches,inch) }"
            @click="active(inches,inch), specs.inch = inch">
            {{ inch }}
          </li>
          <div>
            <ul>
              <li v-for="tire in data.tires">
                {{ tire }}
              </li>
            </ul>
          </div>
        </ul>
      </div>

      <!-- <div class="outputSection">
        {{ specs.width }} 
        <span v-if="specs.height"> / </span>
        {{specs.height}} - {{specs.inch}}
      </div> -->
    </div>
    <router-link to="/login">
      <div v-if="false" class="login">Login</div>
    </router-link>
    <div class="logout">
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
//import firebase from 'firebase'

const db = require('../db.js').db;
const auth = require('../db.js').auth;
const ref = db.ref();
const tires = db.ref('tires/');

const axios = require('axios');
export default {
  name: 'Home',
  data () {
    return {
      data:{  tempInch: [], inches: [], tires: [] },
      content: { allInch:[] },
      specs: { width:'', height:'', inch:'' },
      selected: false,
      inches: { range:[], current:'' },
      tireWidthRange: { range:{}, current:'' },
      tireHeightRange: { range:{}, current:'' },
    }
  },
  methods: {
    active(obj,key) {
      obj.current = key;
      this.data.tires = [];
      ref.child('tire/' + key).once('value', snapShot => {
        let oTire = snapShot.val();
        for (let key in oTire) {
          console.log(key);
          this.data.tires.push(key); 
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
 
      /* if (!allInch.some(e => e.name === 'allInch')) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/content',
          data: {
            [this.specs.inch]: [tireSpecs]
          }
        })

         axios({
          method: 'post',
          url: 'http://localhost:3000/content',
          data: {
            "allInch": [this.specs.inch],
            "name": "allInch"
          }
        })
      }else {

      } */
     
      /* if( !this.content.hasOwnProperty(this.specs.inch) ) {
        axios({
          method: 'put',
          url: 'http://localhost:3000/content',
          data: {
            [this.specs.inch]: [tireSpecs]
          }
        })
      }else {
        axios({
          method: 'put',
          url: 'http://localhost:3000/content',
          data: {
            [this.specs.inch]: this.content[this.specs.inch].push(123)
          }
        })
      }
      return;
      if( this.tire.allInch.indexOf(this.specs.inch) < 0 ) {
        this.add( { [this.specs.inch]: [tireSpecs] } );
      } else {
        axios({
          method: 'put',
          url: 'http://localhost:3000/content',
          data: {
            [this.specs.inch]: this.specs.inch.push(tireSpecs)
          }
        })
      } */
      //console.log(tire.allInch.indexOf(12));
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
    var tempWidthRange = [];
    var tempHeightRange = [];

    for (let i = 155; i <= 325; i += 10) {     
      tempWidthRange.push(i);
    }
    for (let i = 30; i <= 75; i += 5) {
      tempHeightRange.push(i);
    }

    this.assemble(this.tireWidthRange, tempWidthRange)
    this.assemble(this.tireHeightRange, tempHeightRange)

    axios.get('http://localhost:3000/inches')
    .then((res) => {
     this.assemble(this.inches, res.data);
    })

    axios.get('http://localhost:3000/content')
    .then((res) => {
      this.content.allInch = res.data;
   
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
    })
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
