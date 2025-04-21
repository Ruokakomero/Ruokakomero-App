// Tämä komponentti siirrettiin Profile.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)
import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
import InputFieldComponent from "../../components/InputFieldComponent";
import componentStyles from "../../styles/componentStyles";

export default function PasswordChanger({ newPassword, setNewPassword, handlePasswordChange, ...props }) {
  return (
    <View style={componentStyles.section}>
      <InputFieldComponent
        header="Uusi salasana"
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        secureTextEntry
      />
      <ButtonComponent type="edit" content="Vaihda salasana" onPress={handlePasswordChange} textStyle="dark" />
    </View>
  );
}


