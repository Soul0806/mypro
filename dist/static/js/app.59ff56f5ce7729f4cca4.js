webpackJsonp([1],{EQzX:function(e,t){},IPwR:function(e,t){},Mdle:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("7+uW"),s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view",{attrs:{name:"nav"}}),this._v(" "),t("router-view")],1)},staticRenderFns:[]};var r=n("VU/8")({name:"App"},s,!1,function(e){n("Mdle")},null,null).exports,a=n("/ocq"),c={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",[n("nav",[n("div",{staticClass:"wrapper"},[n("ul",e._l(e.tabs,function(t){return n("li",[n("router-link",{attrs:{to:t.link}},[e._v("\n          "+e._s(t.name.ch))])],1)}))])])])},staticRenderFns:[]};var u=n("VU/8")({name:"Top",data:function(){return{tabs:[{name:{en:"overview",ch:"總覽"},link:"/"},{name:{en:"guide",ch:"導覽"},link:"/guide"},{name:{en:"insert",ch:"新增"},link:"/insert"}],currentTab:"overview"}},methods:{}},c,!1,function(e){n("pJ9Q")},"data-v-307838f6",null).exports,o=n("ueVu"),l={data:function(){return{signupForm:{email:"",password:""}}},methods:{signUp:function(){var e=this;o.auth.createUserWithEmailAndPassword(this.signupForm.email,this.signupForm.password).then(function(t){e.$router.push("/")},function(e){alert(e.message)})},signIn:function(){var e=this;o.auth.signInWithEmailAndPassword(this.signupForm.email,this.signupForm.password).then(function(t){e.$router.replace("/")},function(e){alert(e.message)})}}},d={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"signUp"},[n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.signupForm.email,expression:"signupForm.email"}],attrs:{type:"email",placeholder:"email"},domProps:{value:e.signupForm.email},on:{input:function(t){t.target.composing||e.$set(e.signupForm,"email",t.target.value)}}})]),e._v(" "),n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.signupForm.password,expression:"signupForm.password"}],attrs:{type:"password",placeholder:"password"},domProps:{value:e.signupForm.password},on:{input:function(t){t.target.composing||e.$set(e.signupForm,"password",t.target.value)}}})]),e._v(" "),n("button",{on:{click:e.signUp}},[e._v("Sign up")]),e._v(" "),n("button",{on:{click:e.signIn}},[e._v("Sign in")])])},staticRenderFns:[]};var h=n("VU/8")(l,d,!1,function(e){n("EQzX")},null,null).exports,p={name:"Overview",data:function(){return{tires:[]}},computed:{},mounted:function(){var e=this;this.inches=_.range(12,21),this.db_tires().once("value",function(t){e.tires=t.val()})}},v={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{attrs:{id:"overview"}},[n("div",{staticClass:"wrapper ov"},[n("ul",{staticClass:"ov-st"},e._l(e.inches,function(t){return n("li",{staticClass:"ov-st-li"},[n("div",{staticClass:"ov-st-inch"},[n("h3",[e._v(e._s(t))])]),e._v(" "),n("ul",{staticClass:"ov-nd"},e._l(e.tires[t],function(t,i){return n("li",{staticClass:"ov-nd-li"},[n("span",{staticClass:"ov-nd-spec"},[e._v(e._s(i.replace(/-/,"/")))]),e._v(" "),n("span",{staticClass:"ov-nd-num",class:{zero:0==t.num}},[e._v("\n              "+e._s(t.num)+"\n            ")])])}))])}))])])},staticRenderFns:[]};var m=n("VU/8")(p,v,!1,function(e){n("hL7C")},null,null).exports,f={data:function(){return{tireWidthRange:{range:[],current:""},tireHeightRange:{range:[],current:""}}},methods:{check:function(){var e=this,t=this.specs.inch,n=this.specs.width,i=this.specs.height,s=this.data.tempInch,r=n;""!=i&&(r+="-"+i);var a="tire/"+t,c="tire/"+t+"/"+(r+="-"+t);""==t||""==n&&""==i?alert("invalid input"):(s.push(t),this.ref.child(a).once("value",function(t){t.exists()?e.ref.child(c).once("value",function(t){t.exists()?alert("exists"):(e.ref.child(c).set({num:1}),e.data.tires.push(r),e.specs.height="")}):(e.ref.child(c).set({num:1}),e.ref.child("tire/inches").set([s]),e.data.tires.push(r),e.specs.height="")}))},clean:function(){this.specs.inch="",this.specs.width="",this.specs.height=""}},computed:{},mounted:function(){for(var e=155;e<=325;e+=10)this.tireWidthRange.range.push(e);for(var t=30;t<=75;t+=5)this.tireHeightRange.range.push(t)}},g={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"menu"},[n("div",{staticClass:"tireWidth"},[e._v("\n    胎寬\n    "),n("input",{attrs:{id:"toggle",type:"checkbox"}}),e._v(" "),n("label",{attrs:{for:"toggle"}}),e._v(" "),n("ul",e._l(e.tireWidthRange.range,function(t){return n("li",{attrs:{tabindex:"-1"},on:{click:function(n){e.specs.width=t}}},[e._v("\n          "+e._s(t)+"\n      ")])}))]),e._v(" "),n("div",{staticClass:"tireHeight"},[e._v("\n    胎高\n    "),n("input",{attrs:{id:"togglee",type:"checkbox"}}),e._v(" "),n("label",{attrs:{for:"togglee"}}),e._v(" "),n("ul",e._l(e.tireHeightRange.range,function(t){return n("li",{staticClass:"tireHeightLi",attrs:{tabindex:"-1"},on:{click:function(n){e.specs.height=t}}},[e._v("\n        "+e._s(t)+"\n      ")])}))]),e._v(" "),n("div",{staticClass:"inputSec"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.specs.width,expression:"specs.width"}],attrs:{type:"text"},domProps:{value:e.specs.width},on:{input:function(t){t.target.composing||e.$set(e.specs,"width",t.target.value)}}}),e._v(" "),e.specs.height?n("span",[n("span",[e._v(" / ")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.specs.height,expression:"specs.height"}],attrs:{type:"text"},domProps:{value:e.specs.height},on:{input:function(t){t.target.composing||e.$set(e.specs,"height",t.target.value)}}})]):e._e(),e._v(" "),n("span",[e._v(" - ")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.specs.inch,expression:"specs.inch"}],attrs:{type:"text"},domProps:{value:e.specs.inch},on:{input:function(t){t.target.composing||e.$set(e.specs,"inch",t.target.value)}}}),e._v(" "),n("button",{on:{click:function(t){e.check()}}},[e._v("確認")]),e._v(" "),n("button",{on:{click:function(t){e.clean()}}},[e._v("clean")])])])},staticRenderFns:[]};var A=n("VU/8")(f,g,!1,function(e){n("IPwR")},null,null).exports,b=n("fZjL"),w=n.n(b),C={name:"Nav",data:function(){return{currrentInch:"",num:"",date:"",purchases:"",lastClick:0,today:new Date,contents:[]}},computed:{},methods:{nc_reset:function(){this.closed()},ni_active:function(e){this.currrentInch=e},ni_isActive:function(e){return this.currrentInch==e},ni_updateView:function(e){var t=this;if(this.currrentInch!=e){this.db_tires(e).once("value",function(n){t.tires=n.val();var i=t.ctElem("ul",{cls:"navViewUl"}),s=function(n){t.db_tires(e+"/"+n).once("value",function(e){t.num=e.val().num;var s=t.ctElem("li"),r=t.ctElem("span",{id:n}),a=t.ctElem("span",{id:"specNum"}),c=t.ctElem("div",{id:"navViewUl-div"});r.appendChild(document.createTextNode(n)),a.appendChild(document.createTextNode(t.num)),c.appendChild(r),c.appendChild(a),s.appendChild(c),i.appendChild(s),r.addEventListener("click",function(e){var i=document.getElementById("navViewUl-button");null!=i&&i.remove();var s=t.ctElem("span",{id:"navViewUl-button"});s.innerHTML='\n            <button id="decrease" type="button" \n            class="btn btn-danger btn-number">\n              <span class="glyphicon">售</span>\n            </button>\n            <button id="increase" type="button" \n            class="btn btn-success btn-number">\n                <span class="glyphicon">進</span>\n            </button>\n            ',e.target.parentNode.appendChild(s),t.num=e.target.nextElementSibling.innerHTML;var r=e.target.nextElementSibling,a=document.getElementById("decrease"),c=document.getElementById("increase");a.addEventListener("click",function(e){t.nv_ctlNums("decrease",r,n)}),c.addEventListener("click",function(e){t.nv_ctlNums("increase",r,n),t.nv_purchase(n)})})})};for(var r in t.tires)s(r);navView.innerHTML="",navView.appendChild(i)}),this.ni_active(e)}},nv_ctlNums:function(e,t,n){"increase"==e?this.num++:this.num--,this.ref.child("tire/"+this.currrentInch+"/"+n).set({num:this.num}),t.innerHTML=this.num},nv_purchase:function(e){var t=this.today.toLocaleString().slice(2,10).replace(/\//gi,"-"),n={time:this.today.toLocaleString().slice(10).replace(/\s/g,""),q:1},i={};return i["purchase/"+t+"/"+e+"/"+this.ref.child("purchase/"+t+"/"+e).push().key]=n,this.ref.update(i)},np_del:function(e,t,n){var i=this,s=document.getElementById(t).nextElementSibling;if(s){var r=s.innerHTML;s.innerHTML=r-n}var a=t.slice(-2);this.ref.child("tire/"+a+"/"+t).once("value",function(e){var t=e.val();i.num=t.num});var c={};return c["purchase/"+e+"/"+t]=null,c["tire/"+a+"/"+t]={num:this.num-n},this.ref.update(c)},closed:function(){console.log("closed")},hovered:function(){}},mounted:function(){var e=this;this.inches=_.range(12,21),this.db_purchases().on("value",function(t){for(var n in e.purchases=t.val(),e.purchases)if(e.purchases.hasOwnProperty(n))for(var i in e.purchases[n]){var s=e.purchases[n][i];e.purchases[n][i]=w()(s).length}})}},E={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"h-nav"},[i("div",{staticClass:"ni navInch"},[i("ul",{staticClass:"list-inline"},e._l(e.inches,function(t){return i("li",{staticClass:"list-inline-item",class:{active:e.ni_isActive(t)},on:{click:function(n){e.ni_updateView(t)}}},[i("span",{},[e._v(e._s(t))])])}))]),e._v(" "),i("div",{staticClass:"nv",attrs:{id:"navView"}}),e._v(" "),i("div",{staticClass:"np navPurchase"},e._l(e.purchases,function(t,s){return i("div",[i("h2",[e._v(e._s(s))]),e._v(" "),i("ul",e._l(t,function(t,r){return i("li",[i("div",[i("span",[e._v(e._s(r)+", "+e._s(t))]),e._v(" "),i("span",{on:{click:function(n){e.np_del(s,r,t)}}},[i("img",{attrs:{src:n("SFLA")}})])])])}))])}))])},staticRenderFns:[]};var y=n("VU/8")(C,E,!1,function(e){n("QP4+")},null,null).exports,k=n("kxiW"),x=n.n(k);i.a.use(a.a);var F=new a.a({mode:"history",routes:[{path:"*",redirect:"/login"},{path:"/",name:"overview",components:{default:m,nav:u},meta:{requiresAuth:!0}},{path:"/guide",name:"guide",components:{default:y,nav:u},meta:{requiresAuth:!0}},{path:"/insert",name:"insert",components:{default:A,nav:u},meta:{requiresAuth:!0}},{path:"/login",name:"Login",component:h}]});F.beforeEach(function(e,t,n){var i=x.a.auth().currentUser,s=e.matched.some(function(e){return e.meta.requiresAuth});s&&!i?n("login"):!s&&i?n("/"):n()});var N=F,V=(n("M4fF"),n("NYxO"));n("ueVu");i.a.use(V.a);var L=new V.a.Store({state:{currentUser:null,userProfile:{}},actions:{},mutations:{setCurrentUser:function(e,t){e.currentUser=t},setUserProfile:function(e,t){e.userProfile=t}}}),U=n("ueVu"),I={data:function(){return{db:U.db,auth:U.auth,ref:U.ref,tires:"",db_tires:U.db_tires,db_purchases:U.db_purchases,inches:"",data:{tempInch:[],tires:[]},specs:{width:"",height:"",inch:""}}},methods:{ctElem:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=document.createElement(e);if(!this.isEmpty(t))for(var i in t)switch(i){case"cls":n.className=t.cls;break;case"id":n.id=t.id;break;default:tct_Elem.setAttribute("type",t.type)}return n},isEmpty:function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0}},mounted:function(){Element.prototype.remove=function(){this.parentElement.removeChild(this)}}};n("a0pE"),n("erTq");console.log(N),i.a.mixin(I);var P=void 0;n("ueVu").auth.onAuthStateChanged(function(e){P||(P=new i.a({el:"#app",router:N,store:L,components:{App:r},template:"<App/>"}))})},"QP4+":function(e,t){},SFLA:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMQSURBVFhH7VbLThRBFJ2lox+gxrc/IGMiLjQhBJiu6h4YElwp+gP8AH8giTsY0L2Kz62Z+AM+FhLEDzC4UhM0ETIsSLo85/btwDhdPd04S05yMtVV9123bqZyhDKIjTkTR9HtOAwXwTexte+EXHOPZ5BR8cEBhq+BT+Hkj2s2nXBqyrnJyYRc6z5ktsFVcFjVDw9Xq1VhaMk1GomDMHTO2nxShrLQQdCteGLiuJorBxcEF2Dgk5ueLub4X1IHurCxhiAuqtliQNbnofhVMskyXoa8lijaZEJqPh/xzMwxBPB5IM5TMghrN3AtVXXjRxwELSl7lqH/Ia/DmBV1kw3c2xVpON+dR1HSYPwtc0bSJhszCGrqrhfOmBfe0lPZ2u/gPDL5Jc8vPcOaezA+TxlJ4qBuSl6FMa/UXTcgcBLKHV92aKQfUB6iLBzdjBuNjjhiYFHUQfA39KyG75+ZdlAF+NiNx8dPU7YLMH4nN3tjNlRUgKdl0kEU1+uBbgvghA2XbYtVsPauiu4Dmy1vACSmHYJ4ouICfN8j9VMAO49lMmbZIJNr6G1GKLZzFck+nYznu9L3BSWJvFWVfWDzfVdj+ZgEsehUj+Aae0uFni+vzNqPieYBFAogHa/GLGQEsCAB+J5wSm8Axa/ggar0gGd9q+C9gn5NmET+SMUF6P457M3pp4AyuZX0NmG/Z2jtuooKID8jFSONuaXbAsqWf4ZBcAoHu5l3yAHSaGxxAKlsHcNmT4ZNMqT28AJkFmDNIbXlteMbRAQOX+ZVAb+/wfvIfqcrQ1aIezgTmbzsjXmt7nqBwyFR9nUyM2aAnuzkLGsEp+e0Xa9fVXfZQBWWC73nskxe0EN14weirCKIDe9VHIYsfRh+oW11kw/9P7g5kCDoPIq+lf5f6MbGLkFxrdB0yyJ1WPYoWo9HRy+r2XLgX2oYaEnzsBpFAkmbkS8jDJfdyMgJNXd4wNAwAnkGbotxkgOIE4/kWvchuwO552i466o+OMTN5lk4mIWDJTRqG/ygbLNSGECzyPycih+hACqVv28XxGdUFXCgAAAAAElFTkSuQmCC"},a0pE:function(e,t){},erTq:function(e,t){},hL7C:function(e,t){},pJ9Q:function(e,t){},ueVu:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"db",function(){return r}),n.d(t,"auth",function(){return a}),n.d(t,"currentUser",function(){return c}),n.d(t,"ref",function(){return u}),n.d(t,"db_tires",function(){return o}),n.d(t,"db_purchases",function(){return l});var i=n("kxiW"),s=n.n(i);n("881v");s.a.initializeApp({apiKey:"AIzaSyA0hCFocCA9j-_hugnX3tNU82kvpKSb7Bs",authDomain:"myproject-68a05.firebaseapp.com",databaseURL:"https://myproject-68a05.firebaseio.com",projectId:"myproject-68a05",storageBucket:"myproject-68a05.appspot.com",messagingSenderId:"261190786683"});var r=s.a.database(),a=s.a.auth(),c=a.currentUser,u=r.ref("/"),o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=""==e?"tire/":"tire/"+e;return r.ref(t)},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=""==e?"purchase/":"purchase/"+e;return r.ref(t)}}},["NHnr"]);
//# sourceMappingURL=app.59ff56f5ce7729f4cca4.js.map