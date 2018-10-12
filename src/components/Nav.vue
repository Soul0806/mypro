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
        <li :class="{ active: isActive(inch) }" 
        v-for="inch in data.inches"  
        @mouseover="updateView(inch), active(inch)">
          <span>{{ inch }}</span>
        </li>         
      </ul>      
    </div>
    <div id="navView">
    </div>
    <div id="test"></div> 
  </div>
</template>
<script>

export default {
  name: "Nav",
  data() { 
    return {
      lastClick: 0,
      currrentInch: '',
      contents: []
    }
  },
  computed: {
   
  },
  methods: {
    test() {
      console.log(123);
    },
    active(inch) {
      this.currrentInch = inch;
    },
    isActive(inch) {
      return this.currrentInch == inch ? true : false;
    },
    updateView(inch) {  
      var i = inch;     
      this.ref.child('tire/' + i).once('value', snapShot => {
        let oTire = snapShot.val();
        var ul = document.createElement('ul');
        ul.className = 'navViewUl';
        for (let j in oTire) {
          this.ref.child('tire/' + i + '/' + j).once('value', snapShot => {
            let num = snapShot.val().num;
            var li  = document.createElement("li");
            var span = document.createElement("span");
            var spanNum = document.createElement("span");
            var div = document.createElement('div');
            div.id = 'navViewUl-div';
            span.appendChild( document.createTextNode(j) );
            spanNum.appendChild(document.createTextNode(num));  
            div.appendChild(span); 
            div.appendChild(spanNum); 
            li.appendChild(div);
            ul.appendChild(li);   
            
            span.addEventListener('click', function (e) {
              var el_child = document.getElementById('navViewUl-button');
              if (el_child != null) {
                var el_parent = el_child.parentElement;
                el_parent.removeChild(el_child);
              }
              var div = document.createElement("div");
              div.id = 'navViewUl-button';
              div.innerHTML = `<button> + </button>
                           <button> - </button>`;;
              e.target.parentNode.appendChild(div);
            })
          })          
        }        
        navView.innerHTML = '';
        navView.appendChild(ul);              
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
      var test = 123;
    }
  }
}
</script>

<style lang="scss">

@import '@/assets/nav.scss';
</style>

