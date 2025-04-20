// Tämä komponentti siirrettiin Profile.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)
import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function PasswordChanger({ newPassword, setNewPassword, handlePasswordChange }) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Uusi salasana"
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        secureTextEntry
      />
      <Button title="Vaihda salasana" onPress={handlePasswordChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
