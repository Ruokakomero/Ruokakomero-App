import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, deleteUser, signOut, updatePassword } from "firebase/auth";
import { getDatabase, ref, set, remove } from "firebase/database";
import useCurrentUser from "../configuration/useCurrentUser";
import ProfileFormFields from "../components/profile/ProfileFormFields";
import PasswordChanger from "../components/profile/PasswordChanger";
import DietSelector from "../components/profile/DietSelector";
import ProfileActions from "../components/profile/ProfileActions";
import TextThemed from "../components/TextThemed";

import textStyles from "../styles/textStyles";
import screensStyles from "../styles/screensStyles";

export default function Profile({ handleLogout }) {
  const auth = getAuth();
  const database = getDatabase();
  const { user, userId, loading } = useCurrentUser();

  const [editableUser, setEditableUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!user) return;
    setEditableUser({
      ...user,
      email: auth.currentUser?.email ?? user.email,
    });
  }, [user, auth.currentUser]);
  

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Ladataan käyttäjätietoja…</Text>
      </SafeAreaView>
    );
  }

  if (!editableUser) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Ei kirjautunutta käyttäjää.</Text>
      </SafeAreaView>
    );
  }

  const handleSave = async () => {
    try {
      await set(ref(database, `users/${userId}`), editableUser);
         // kun tiedot on tallennettu, käyttäjän tietoihin aeteteaan firstLogindone = true, jolloin käyttäjä päätuyy jatkossa kirjautuessaan reseptisivulle eikä profiiliin
    await set(ref(database, `users/${userId}/firstLoginDone`), true);
      Alert.alert("Tiedot tallennettu onnistuneesti!");
    } catch (error) {
      Alert.alert("Virhe tallennuksessa", error.message);
    }
  };

  const handleInputChange = (field, value) => {
    setEditableUser((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDiet = (dietType) => {
    setEditableUser((prev) => ({
      ...prev,
      diet: { ...prev.diet, [dietType]: !prev.diet[dietType] },
    }));
  };

  const handleDeleteAccount = async () => {
    try {
      await remove(ref(database, `users/${userId}`));
      await deleteUser(auth.currentUser);
      Alert.alert("Poisto onnistui");
      await signOut(auth);
    } catch (error) {
      Alert.alert("Virhe", error.message);
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

  const handlePasswordChange = async () => {
    if (!auth.currentUser || newPassword.length < 6) return;

    try {
      await updatePassword(auth.currentUser, newPassword);
      Alert.alert("Salasana vaihdettu");
      setNewPassword("");
    } catch (error) {
      Alert.alert("Virhe", error.message);
    }
  };

  const handleLocalLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("isLoggedIn");
    } catch (error) {
      console.log("Virhe", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1}}>
      <KeyboardAvoidingView
        style={{ flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={screensStyles.profileContainer}>
          <TextThemed style={textStyles.titleLargeB}>
            Profiilin tiedot
          </TextThemed>

          <ProfileFormFields
            user={editableUser}
            handleInputChange={handleInputChange}
          />

          <PasswordChanger
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            handlePasswordChange={handlePasswordChange}
          />

          <DietSelector userDiet={editableUser.diet} toggleDiet={toggleDiet} />

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
