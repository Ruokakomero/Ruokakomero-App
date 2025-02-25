import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database'; // Lisää tämä!

const firebaseConfig = {
  apiKey: "AIzaSyDH2IaYLc-P0md-cmZvovz7jtXfsVrHw08",
  authDomain: "ruokakomero-3022b.firebaseapp.com",
  databaseURL: "https://ruokakomero-3022b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ruokakomero-3022b",
  storageBucket: "ruokakomero-3022b.firebasestorage.app",
  messagingSenderId: "934777900518",
  appId: "1:934777900518:web:aa05684a40149706701a27",
  measurementId: "G-79P6W4NWGZ"
};

// Alustetaan Firebase vain, jos sitä ei ole vielä alustettu
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const database = firebase.database(); // Real timen käyttöön otto

export { firebase, firestore, database };
