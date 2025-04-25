// Tämä komponentti siirrettiin Profile.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import componentStyles from "../../styles/componentStyles";
import MainTheme from "../../styles/MainTheme";
import textStyles from "../../styles/textStyles";
import TextThemed from "../../components/TextThemed";
import { Button } from "react-native-paper";
import ButtonComponent from "../ButtonComponent";
import { ScrollView } from "react-native-gesture-handler";

export default function DietSelector({
  userDiet = {},
  toggleDiet,
  dietOptions = [],
  ...props
}) {
  return (
    <View style={componentStyles.section}>
      <View style={componentStyles.dietSelectorWrapper}>
        <TextThemed style={textStyles.titleLargeB}>Ruokavalio</TextThemed>
        <View style={componentStyles.dietSelectorContainer}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={componentStyles.dietContainer}
          >
            {dietOptions.map(({ type, label }) => (
              <ButtonComponent
                key={type}
                type={userDiet[type] ? "enabled" : "disabled"}
                onPress={() => toggleDiet(type)}
                content={label}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
