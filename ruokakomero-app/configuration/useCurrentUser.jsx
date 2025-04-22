// configuration/useCurrentUser.jsx
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import { defaultUserData } from "./defaultUser";

const useCurrentUser = () => {
  const [user, setUser]       = useState(null);
  const [userId, setUserId]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth     = getAuth();
    const database = getDatabase();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
    
        setUser(null);
        setUserId(null);
        setLoading(false);
        return;
      }

      const uid     = currentUser.uid;
      const userRef = ref(database, `users/${uid}`);
      const snap    = await get(userRef);

      if (!snap.exists()) {
       
        const initData = {
          ...defaultUserData,
          email: currentUser.email || "",
        };

        
        await set(userRef, initData);
   
        setUser(initData);
      } else {

        setUser(snap.val());
      }

      setUserId(uid);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, userId, loading };
};

export default useCurrentUser;
