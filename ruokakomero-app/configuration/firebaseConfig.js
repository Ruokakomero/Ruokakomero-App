// configuration/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// React‑Native Auth persistence
import {
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDH2IaYLc-P0md-cmZvovz7jtXfsVrHw08",
  authDomain: "ruokakomero-3022b.firebaseapp.com",
  databaseURL:
    "https://ruokakomero-3022b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ruokakomero-3022b",
  storageBucket: "ruokakomero-3022b.firebasestorage.app",
  messagingSenderId: "934777900518",
  appId: "1:934777900518:web:aa05684a40149706701a27",
  measurementId: "G-79P6W4NWGZ",
};

// 1️⃣ Initialize core app
const app = initializeApp(firebaseConfig);

// 2️⃣ Initialize Auth with RN persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// 3️⃣ Initialize Realtime Database
export const database = getDatabase(app);
