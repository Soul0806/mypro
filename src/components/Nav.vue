<template>
  <div class="h-nav">
    <div class="navInch">      
      <ul class="list-inline">
        <li :class="{ active: isActive(inch) }" 
        class="list-inline-item"
        v-for="inch in data.inches"  
        @click="updateView(inch), active(inch)">
          <span class="">{{ inch }}</span>
        </li>
      </ul>  
    </div>
    <div id="navView">
    </div> 
    <div v-for="(val, key) in ims" class="purchase">
      {{ key }} , {{ val.quantity }} 
      <span @click="del(key)"><img src="../assets/icons/exit.png"></span>     
    </div>
  </div>
</template>
<script>

export default {
  name: "Nav",
  data() { 
    return {
      lastClick: 0,
      currrentInch: '',
      contents: [],
      num: '',
      today: new Date(),
      date: '',
      ims: ''
    }
  },
  computed: {
   
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
            var span =  this.ctElem('span', 'spec');
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
    del(inch) {
      this.ref.child(`purchase/${this.date}/${inch}`).set(null);
    }
  },
  mounted() {    
    this.data.inches = _.range(12, 21);       
    this.date = this.today.toLocaleString().slice(2, 10).replace(/\//ig, "-");
    this.ref.child(`purchase/${this.date}`).on('value', (snapShot) => {
      var val = snapShot.val();
      this.ims = val;      
      for(let key in this.ims) {        
        if( this.ims.hasOwnProperty(key) ) {
          var quan = Object.keys(this.ims[key]).length;
          console.log(this.ims[key]);
          this.ims[key].quantity = quan;
         // console.log(Object.keys(this.ims[key]).length)
        }
      }
      console.log(this.ims);
      //console.log(this.ims);
      Object.values(val).forEach(function (el) {
        console.log(Object.keys(el).length);
      });
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/nav.scss';
</style>

