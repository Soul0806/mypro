<template>
  <div class="h-nav">
    <div class="navInch">      
      <ul class="list-inline">
        <li class="list-inline-item"        
        :class="{ active: isActive(inch) }"
        v-for="inch in inches"  
        @click="updateView(inch)">
          <span class="">{{ inch }}</span>
        </li>
      </ul>  
    </div>
    <div id="navView">
    </div> 
    <div class="navPurchase">
      <div v-for="(val, key) in purchases">    
        <h2>{{ key }}</h2>
          <ul>
            <li v-for="(val, key_d) in val"> 
            <div>
              <span>{{ key_d }}, {{ val }}</span>
              <span @click="del(key, key_d, val)">
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
  /*  navInch_ObjClass: function () {
      return {
        active: isActive(inch),
        'list-inline-item': true
      }
    } */
  },
  methods: {
    active(inch) {
      this.currrentInch = inch; 
    },
    isActive(inch) {
      return this.currrentInch == inch ? true : false;
    },    
    updateView(inch) {  
     
      if(this.currrentInch == inch) return;
      var i = inch;
      var flag = 1;     
      this.ref.child('tire/' + i).once('value', snapShot => {
        let oTire = snapShot.val();
        var ul = this.ctElem('ul', { cls: 'navViewUl' });
        for (let j in oTire) {
          this.ref.child('tire/' + i + '/' + j).once('value', snapShot => {   
            this.num = snapShot.val().num;
            var li  =  this.ctElem('li');
            var span =  this.ctElem('span', { id: j });
            var spanNum =  this.ctElem('span', { id: 'specNum' });
            var div =  this.ctElem('div', { id: 'navViewUl-div'} );
            span.appendChild( document.createTextNode(j) );
            spanNum.appendChild(document.createTextNode(this.num));  
            div.appendChild(span); 
            div.appendChild(spanNum); 
            li.appendChild(div);
            ul.appendChild(li);

            span.addEventListener('click', (e) => {
              
              var el_child = document.getElementById('navViewUl-button');
              if (el_child != null) {
                var el_parent = el_child.parentElement;
                el_parent.removeChild(el_child);
              }
              var span = this.ctElem("span", { id: 'navViewUl-button' });
              span.innerHTML = `
              <button id="decrease" type="button" 
              class="btn btn-danger btn-number">
                <span class="glyphicon glyphicon-minus"></span>
              </button>
              <button id="increase" type="button" 
              class="btn btn-success btn-number">
                  <span class="glyphicon glyphicon-plus"></span>
              </button>
              `;
              e.target.parentNode.appendChild(span); 

              this.num = e.target.nextElementSibling.innerHTML;
              var specNumElem = e.target.nextElementSibling;
              var btnDec = document.getElementById('decrease');
              var btnInc = document.getElementById('increase');
              btnDec.addEventListener('click', (e) => {
                this.ctlNums('decrease', specNumElem, j);
              }) 
              btnInc.addEventListener('click', (e) => {
                this.ctlNums('increase', specNumElem, j);
                this.purchase(j);
              }) 
            })
          })          
        }        
        navView.innerHTML = '';
        navView.appendChild(ul);              
      })
      this.active(inch);
    },
    ctlNums(behav, specNumElem, inch) {
      (behav == 'increase') ? this.num++ : this.num-- ;
      this.ref.child('tire/' + this.currrentInch + '/' + inch).set({
        num: this.num
      });
      specNumElem.innerHTML = this.num;
    },
    purchase(inch) {
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
    del(date, specInch, q) {
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
    this.ref.child(`purchase/`).on('value', snapShot => {
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

