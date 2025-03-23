import { auth } from "../constants/firebaseConfig"; // Tuo auth firebaseConfig.js:stä
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

const AuthScreen = {
  // Luo tunnus
  handleRegister: async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (username) {
        await updateProfile(user, { displayName: username });
      }

      return {
        success: true,
        user: user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Kirjaudu sisään
  handleLogin: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Kirjaudu ulos
  handleSignout: async () => {
    try {
      await signOut(auth);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

export default AuthScreen;
