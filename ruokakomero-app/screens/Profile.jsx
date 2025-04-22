import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  Text,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, deleteUser, signOut, updatePassword } from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";
import ProfileFormFields from "../components/profile/ProfileFormFields";
import PasswordChanger from "../components/profile/PasswordChanger";
import DietSelector from "../components/profile/DietSelector";
import ProfileActions from "../components/profile/ProfileActions";
import TextThemed from "../components/TextThemed";
import textStyles from "../styles/textStyles";
import screensStyles from "../styles/screensStyles";
import componentStyles from "../styles/componentStyles";

const auth = getAuth();
const database = getDatabase();

export default function Profile({ handleLogout }) {
  const [user, setUser] = useState({
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
  });

  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = ref(database, `users/${currentUser.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUser(snapshot.val());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSave = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        await set(ref(database, `users/${currentUser.uid}`), user);
        Alert.alert("Tiedot tallennettu onnistuneesti!");
      } catch (error) {
        Alert.alert("Virhe tallennuksessa", error.message);
      }
    }
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Vahvista poistaminen",
      "Haluatko varmasti poistaa profiilisi?",
      [
        { text: "Peruuta", style: "cancel" },
        { text: "Poista", onPress: handleDeleteAccount, style: "destructive" },
      ]
    );
  };

  const handleDeleteAccount = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      await remove(ref(database, `users/${currentUser.uid}`));
      await deleteUser(currentUser);
      Alert.alert("Poisto onnistui");
      await signOut(auth);
    } catch (error) {
      Alert.alert("Virhe", error.message);
    }
  };

  const handlePasswordChange = async () => {
    
    const currentUser = auth.currentUser;
    if (!currentUser || newPassword.length < 6) return;

    try {
      await updatePassword(currentUser, newPassword);
      Alert.alert("Salasana vaihdettu");
      setNewPassword("");
    } catch (error) {
      Alert.alert("Virhe", error.message);
    }
  };

  const handleInputChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDiet = (dietType) => {
    setUser((prev) => ({
      ...prev,
      diet: { ...prev.diet, [dietType]: !prev.diet[dietType] },
    }));
  };

  const handleLocalLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("isLoggedIn");
      handleLogout();
    } catch (error) {
      Alert.alert("Virhe", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={screensStyles.profileContainer}>
          <TextThemed style={textStyles.titleLargeB}>
            Profiilin tiedot
          </TextThemed>

          <ProfileFormFields
            user={user}
            handleInputChange={handleInputChange}
          />
          <PasswordChanger
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            handlePasswordChange={handlePasswordChange}
          />
          <DietSelector userDiet={user.diet} toggleDiet={toggleDiet} />
          <ProfileActions
            handleSave={handleSave}
            confirmDeleteAccount={confirmDeleteAccount}
            handleLogout={handleLocalLogout}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

