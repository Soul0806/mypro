import firebase from 'firebase'
import 'firebase/firestore'
const  config = {
  apiKey: "AIzaSyA0hCFocCA9j-_hugnX3tNU82kvpKSb7Bs",
  authDomain: "myproject-68a05.firebaseapp.com",
  databaseURL: "https://myproject-68a05.firebaseio.com",
  projectId: "myproject-68a05",
  storageBucket: "myproject-68a05.appspot.com",
  messagingSenderId: "261190786683"
};
firebase.initializeApp(config)

const db = firebase.database();
//const db = firebase.firestore();
const auth = firebase.auth(); 
const currentUser = auth.currentUser;
const ref = db.ref('/');

var db_tires = (e = '') => {
  var reference = e == '' ? 'mytires/' : `mytires/${e}`; 
  return db.ref(reference);
}

var db_purchases = (e = '') => {
  var reference = e == '' ? "purchase/" : `purchase/${e}`;
  return db.ref(reference);
}

export {
  db,
  auth,
  currentUser,
  ref,
  db_tires,
  db_purchases
  //purchases
  //booksCollection,
  //usersCollection
};