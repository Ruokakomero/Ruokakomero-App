// Tämä komponentti siirrettiin Profile.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)
import React from "react";
import { View, Button, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ProfileActions({ handleSave, confirmDeleteAccount, handleLogout }) {
  return (
    <View>
      <Button title="Tallenna tiedot" onPress={handleSave} />
      <Button title="Poista profiili" color="red" onPress={confirmDeleteAccount} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Kirjaudu ulos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "#555",
    padding: 12,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
