<template>
  <div class="container">
    <ygnav></ygnav>
    <!-- <ygmenu></ygmenu> -->
    <!-- <div class="logout">
      <button @click="logout">Logout</button>
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import nav from '@/components/nav'
import menu from '@/components/menu'

Vue.component('ygnav', nav)
Vue.component('ygmenu', menu)
//import db from 'firebase'
const db = require('../db.js').db;
const auth = require('../db.js').auth;
const ref = db.ref();
const tires = db.ref('tires/');

//const axios = require('axios');
export default {
  name: 'Home',
  data () {
    return {  
    }
  },
  methods:{
    logout() {
      auth.signOut().then(() => {
        this.$router.replace('login');
      })
    }
  },
  mounted() {
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
