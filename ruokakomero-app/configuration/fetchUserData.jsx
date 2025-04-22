import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, deleteUser, signOut, updatePassword } from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";

const auth = getAuth();
const database = getDatabase();
const [user, setUser] = {
    firstName: "",
    lastName: "",
    email: "",
    diet: {
      vege: false,
      glutenFree: false,
      lactoseFree: false,
      vegan: false,
    },
    recipes: {},
}

const fetchUser = {  

        fetchUserData: async () => {
          const currentUser = auth.currentUser;
          if (currentUser) {
            const userRef = ref(database, `users/${currentUser.uid}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
              setUser(snapshot.val());
            }
          }
        }

};

export default fetchUser;

