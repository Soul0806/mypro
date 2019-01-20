import { db, auth, ref, tires, db_tires, db_purchases } from "@/db.js";

/* const db = require('@/db.js').db;
const auth = require('@/db.js').auth;
const ref = db.ref();
const tires = db.ref('tires/'); */

const regular = {
  data() {
    return {
      db,
      auth,
      ref,
      tires: [],
      db_tires,
      db_purchases,
      inches: '',
      
      data: { tempInch: [], tires: [] },
      specs: { width: "", height: "", inch: "" }
    };
  },
  methods: {
    ctElem(argu = {}) {
      let ctElem = document.createElement(argu.elem);
      if (!this.isEmpty(argu)) {
        for(let key in argu) {
          switch (key) {
            case 'cls':
              ctElem.className = argu.cls;
              break;
            case 'id':
              ctElem.id = argu.id;
              break;
            case 'text':
              ctElem.innerHTML =  argu.text;
              break;
            /* default:
              ctElem.setAttribute("type", argu.type); */
          }
        }
      }
      return ctElem;      
    },
    isEmpty(obj) {
      for(let key in obj) {
        if(obj.hasOwnProperty(key)) 
          return false
      }
      return true;
    }
  },
  mounted() {
    Element.prototype.remove = function () {
      this.parentElement.removeChild(this);
    }
  }
};

export default regular