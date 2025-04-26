import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3YoPRL7MwmTfVVxKpbXXQ8SouSN1mMUA",
  authDomain: "ruokakomero-testi.firebaseapp.com",
  databaseURL: "https://ruokakomero-testi-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ruokakomero-testi",
  storageBucket: "ruokakomero-testi.firebasestorage.app",
  messagingSenderId: "546892826414",
  appId: "1:546892826414:web:d12308377f790eb01fdcbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

// Export initialized services
export { app, auth, firestore, database };
