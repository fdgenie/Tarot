import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBa-OZBPR1VSJ4yC3GPccJrHTm-eIXxAng",
  authDomain: "tarot-a9ace.firebaseapp.com",
  databaseURL: "https://tarot-a9ace.firebaseio.com",
  projectId: "tarot-a9ace",
  storageBucket: "tarot-a9ace.appspot.com",
  messagingSenderId: "50119472347",
  appId: "1:50119472347:web:8f64c955c828ef501c88fe",
  measurementId: "G-JKD325QQFP"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseDb = firebaseApp.database();
let firebaseAuth = firebaseApp.auth();

export { firebaseDb, firebaseAuth }
