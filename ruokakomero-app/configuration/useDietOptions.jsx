import { useState, useEffect } from "react";
import {  ref, onValue } from "firebase/database";
import { database } from "./firebaseConfig";

export default function useDietOptions() {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const db = database;
    const dietsRef = ref(db, "dietOptions");               
    const unsubscribe = onValue(dietsRef, (snap) => {
      const obj = snap.val() || {};
      const arr = Object.entries(obj).map(([type, label]) => ({
        type,
        label,
      }));
      setOptions(arr);
    });
    return () => unsubscribe();
  }, []);
  return options;
}
