import { auth } from "../constants/firebaseConfig";

const AuthScreen = {
  // luo tunnus
  handleRegister: async (email, password, username) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      if (username) {
        await user.updateProfile({
          displayName: username,
        });
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
  // kirjaudu sisään
  handleLogin: async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
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

  // kirjaudu ulos
  handleSignout: async () => {
    try {
      await auth.signOut();
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
