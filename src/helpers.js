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
      tires: '',
      db_tires,
      db_purchases,
      inches: '',
      data: { tempInch: [], tires: [] },
      specs: { width: "", height: "", inch: "" }
    };
  },
  methods: {
    ctElem(elem, argu = {}) {
      let ct_Elem = document.createElement(elem);
      if (!this.isEmpty(argu)) {
        /* argu.hasOwnProperty("cls")
          ? (ct_Elem.className = argu.cls)
          : (ct_Elem.id = argu.id); */
        for(let key in argu) {
          switch (key) {
            case 'cls':
              ct_Elem.className = argu.cls;
              break;
            case 'id':
              ct_Elem.id = argu.id;
              break;
            default:
              tct_Elem.setAttribute("type", argu.type);
          }
        }
      }
      return ct_Elem;      
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