<template>
  <div class="h-nav">
    <div class="nc navCtrl">
      <button @click="nc_reset">reset</button>
    </div>
    <div class="ni navInch">      
      <ul class="list-inline">
        <li class="list-inline-item"        
        :class="{ active: ni_isActive(inch) }"
        v-for="inch in inches"  
        @click="ni_updateView(inch)">
          <span class="">{{ inch }}</span>
        </li>
      </ul>  
    </div>
    <div class="nv" id="navView">
    </div> 
    <div class="np navPurchase">
      <div v-for="(val, key) in purchases">    
        <h2>{{ key }}</h2>
          <ul>
            <li v-for="(val, key_d) in val"> 
            <div>
              <span>{{ key_d }}, {{ val }}</span>
              <span @click="np_del(key, key_d, val)">
                  <img src="../assets/icons/exit.png">
              </span>
            </div>
            </li>
          </ul>        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Nav",
  data() { 
    return {     
      currrentInch: '',     
      num: '',      
      date: '',
      purchases: '',
      lastClick: 0,
      today: new Date(),
      contents: []
    }
  },
  computed: {
  },
  methods: {
    nc_reset() {
      this.db_tires().on('value', snapShot => {
        var val = snapShot.val();
        Object.keys(val).forEach( x => {    
          Object.keys(val[x]).forEach( y => {
            this.ref.child(`tire/${x}/${y}`).set({
              num: 1
            });
          });
        });
      })
      location.reload();
    },  
    ni_active(inch) {
      this.currrentInch = inch; 
    },
    ni_isActive(inch) {
      return this.currrentInch == inch ? true : false;
    },    
    ni_updateView(inch) {       
      if(this.currrentInch == inch) return;
      var i = inch;    
      this.db_tires(inch).once('value', snapShot => {
        this.tires = snapShot.val();
        var ul = this.ctElem('ul', { cls: 'navViewUl' });
        for (let key in this.tires) {
          this.db_tires(`${inch}/${key}`).once('value', snapShot => {   
            this.num = snapShot.val().num;
            var li  =  this.ctElem('li');
            var span =  this.ctElem('span', { id: key });
            var spanNum =  this.ctElem('span', { id: 'specNum' });
            var div =  this.ctElem('div', { id: 'navViewUl-div'} );
            span.appendChild( document.createTextNode(key) );
            spanNum.appendChild(document.createTextNode(this.num));  
            div.appendChild(span); 
            div.appendChild(spanNum); 
            li.appendChild(div);
            ul.appendChild(li);

            span.addEventListener('click', e => {
            var navViewUl_button = document.getElementById('navViewUl-button');
            if (navViewUl_button != null) navViewUl_button.remove();
            
            var span = this.ctElem("span", { id: 'navViewUl-button' });
            span.innerHTML = `
            <button id="decrease" type="button" 
            class="btn btn-danger btn-number">
              <span class="glyphicon">售</span>
            </button>
            <button id="increase" type="button" 
            class="btn btn-success btn-number">
                <span class="glyphicon">進</span>
            </button>
            `;
            
            e.target.parentNode.appendChild(span); 

            this.num = e.target.nextElementSibling.innerHTML;
            var specNumElem = e.target.nextElementSibling;
            var btnDec = document.getElementById('decrease');
            var btnInc = document.getElementById('increase');
            btnDec.addEventListener('click', e => {
              this.nv_ctlNums('decrease', specNumElem, key);
            }) 
            btnInc.addEventListener('click', e => {
              this.nv_ctlNums('increase', specNumElem, key);
              this.nv_purchase(key);
            }) 
            })
          })          
        }        
        navView.innerHTML = '';
        navView.appendChild(ul);              
      })
      this.ni_active(inch);
    },
    nv_ctlNums(behav, specNumElem, inch) {
      (behav == 'increase') ? this.num++ : this.num-- ;
      this.ref.child('tire/' + this.currrentInch + '/' + inch).set({
        num: this.num
      });
      specNumElem.innerHTML = this.num;
    },
    nv_purchase(inch) {
      var d = this.today.toLocaleString().slice(2,10).replace(/\//ig, "-");
      var t = this.today.toLocaleString().slice(10).replace(/\s/g, '');

      var data = {
        time: t,
        q: 1
      }

      var newDataKey = this.ref.child(`purchase/${d}/${inch}`).push().key;
      var updates= {};
      updates[`purchase/${d}/${inch}/` + newDataKey] = data;

      return this.ref.update(updates);
    },
    np_del(date, specInch, q) {
      var specNumElem = document.getElementById(specInch).nextElementSibling;
      if(specNumElem) {
        var specNum = specNumElem.innerHTML;
        specNumElem.innerHTML = specNum - q
      }            
      var inch = specInch.slice(-2);
      
      this.ref.child(`tire/${inch}/${specInch}`)
          .once('value', (snapShot) => {
            var val = snapShot.val();
            this.num = val.num;
          })
      var updates = {};   
      updates[`purchase/${date}/${specInch}`] = null;
      updates[`tire/${inch}/${specInch}`] = {
        num: this.num - (q)
      }
      //console.log(`purchase/${date}/${specInch}`);
      return this.ref.update(updates);
      //this.ref.child(`purchase/${date}/${specInch}`).set(null);
    },
},
  mounted() {
    this.inches = _.range(12, 21);
    this.db_purchases().on('value', snapShot => {
      this.purchases = snapShot.val();     
      for(let key in this.purchases) {        
        if( this.purchases.hasOwnProperty(key) ) {
          for(let key_d in this.purchases[key]) {
            let obj = this.purchases[key][key_d];
            // second floor replace
            this.purchases[key][key_d] = Object.keys(obj).length;
          }  
        }
      } 
    })    
  }
}
</script>

<style lang="scss">
@import '@/assets/nav.scss';
</style>

