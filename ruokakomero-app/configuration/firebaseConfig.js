import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

// Export initialized services
export { app, auth, firestore, database };
