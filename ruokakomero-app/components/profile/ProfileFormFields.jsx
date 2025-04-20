// Tämä komponentti siirrettiin Profile.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)
import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

export default function ProfileFormFields({ user, handleInputChange }) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Etunimi"
        value={user.firstName}
        onChangeText={(text) => handleInputChange("firstName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sukunimi"
        value={user.lastName}
        onChangeText={(text) => handleInputChange("lastName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sähköposti"
        value={user.email}
        onChangeText={(text) => handleInputChange("email", text)}
      />

      <Text style={styles.subtitle}>Suosikkiraaka-aineet</Text>
      <TextInput
        style={styles.input}
        placeholder="Kirjoita suosikkiraaka-aineet pilkuilla erotettuna"
        value={user.favoriteIngredients}
        onChangeText={(text) =>
          handleInputChange("favoriteIngredients", text)
        }
      />

      <Text style={styles.subtitle}>Inhokkiraaka-aineet</Text>
      <TextInput
        style={styles.input}
        placeholder="Kirjoita inhokkiraaka-aineet pilkuilla erotettuna"
        value={user.dislikedIngredients}
        onChangeText={(text) =>
          handleInputChange("dislikedIngredients", text)
        }
      />
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
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
});
