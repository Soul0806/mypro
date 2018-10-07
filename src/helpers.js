import {db, auth, ref, tires} from '@/db.js'

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
      tires,
      data: { tempInch: [], inches: [], tires: [] },
      specs: { width: '', height: '', inch: '' }
    }
  },
  methods: {
    active(key) {
    },
    ctlNums(behav, obj, inch) {
      this.specs.inch = inch;
      (behav == 'add') ? obj.num++ : obj.num--;
      this.ref.child('tire/' + this.specs.inch + '/' + obj.spec).set({
        num: obj.num
      });
    }
  }
}

export default regular