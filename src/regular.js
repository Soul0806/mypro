const db = require('@/db.js').db;
const auth = require('@/db.js').auth;
const ref = db.ref();
const tires = db.ref('tires/');

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
      var delay = 400;
      if (this.lastClick != 0) {
        if (this.lastClick >= (Date.now() - delay))
          return;
      }
      this.lastClick = Date.now();
      this.data.tires = [];
      ref.child('tire/' + key).once('value', snapShot => {
        let oTire = snapShot.val();
        for (let k in oTire) {
          ref.child('tire/' + key + '/' + k).once('value', snapShot => {
            let num = snapShot.val().num;
            let obj = { spec: k, num: num };
            this.data.tires.push(obj);
          })
        }
      })
    },
    ctlNums(behav, obj, inch) {
      this.specs.inch = inch;
      (behav == 'add') ? obj.num++ : obj.num--;
      ref.child('tire/' + this.specs.inch + '/' + obj.spec).set({
        num: obj.num
      });
    }
  }
}

export default regular