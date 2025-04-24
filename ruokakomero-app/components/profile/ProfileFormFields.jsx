// Tämä komponentti siirrettiin Profile.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)
import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

import InputFieldComponent from "../../components/InputFieldComponent";
import ButtonComponent from "../../components/ButtonComponent";
import TextThemed from "../../components/TextThemed";
import textStyles from "../../styles/textStyles";
import componentStyles from "../../styles/componentStyles";
import MainTheme from "../../styles/MainTheme";

export default function ProfileFormFields({ user, handleInputChange, ...props }) {
  return (
    <View>
      <InputFieldComponent
        header="Etunimi"
        value={user.firstName}
        onChangeText={(text) => handleInputChange("firstName", text)}
      />
      <InputFieldComponent
        header="Sukunimi"
        value={user.lastName}
        onChangeText={(text) => handleInputChange("lastName", text)}
      />
      <InputFieldComponent
        header="Sähköposti"
        value={user.email}
        onChangeText={(text) => handleInputChange("email", text)}
      />
{/*
      <TextThemed style={textStyles.titleLargeB}>Suosikkiraaka-aineet</TextThemed>
      <InputFieldComponent
        header="Suosikkiraaka-aineet"
        placeholder="Kirjoita suosikkiraaka-aineet pilkuilla erotettuna"
        value={user.favoriteIngredients}
        onChangeText={(text) =>
          handleInputChange("favoriteIngredients", text)
        }
      />

      <TextThemed style={textStyles.titleLargeB}>Inhokkiraaka-aineet</TextThemed>
      <InputFieldComponent
        header="Inhokkiraaka-aineet"
        placeholder="Kirjoita inhokkiraaka-aineet pilkuilla erotettuna"
        value={user.dislikedIngredients}
        onChangeText={(text) =>
          handleInputChange("dislikedIngredients", text)
        }
      />

      */ }
    </View>
  );
}


