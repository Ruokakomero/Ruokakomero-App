import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8i7IC3oNymnciRi3UVr38C6R-8a9cAZg",
  authDomain: "fir-83c92.firebaseapp.com",
  databaseURL: "https://fir-83c92-default-rtdb.firebaseio.com",
  projectId: "fir-83c92",
  storageBucket: "fir-83c92.firebasestorage.app",
  messagingSenderId: "23715993697",
  appId: "1:23715993697:web:60ee4fcdb9a84fba66f220"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const firestore = getFirestore(app);
const database = getDatabase(app);

// Export initialized services
export { app, auth, firestore, database };
