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

const dietOptions = {
  vege: "Vege",
  glutenFree: "Gluteeniton",
  lactoseFree: "Laktoositon",
  vegan: "Vegaani",
  nutAllergy: "Pähkinäallergia",
  halal: "Halal",
};

export default function DietSelector({ userDiet, toggleDiet, ...props }) {
  return (
    <View style={componentStyles.section}>
    <View style={componentStyles.dietSelectorWrapper}>
      <TextThemed style={textStyles.titleLargeB}>Ruokavalio</TextThemed>
      <View  style={componentStyles.dietSelectorContainer}>
        <ScrollView horizontal={true} contentContainerStyle={componentStyles.dietContainer}>
          {Object.keys(dietOptions).map((dietType) => (
            <ButtonComponent
              key={dietType}
              type={userDiet[dietType] ? "enabled" : "disabled"}
              onPress={() => toggleDiet(dietType)}
              content={dietOptions[dietType]}
            />
          ))}
        </ScrollView>
      </View>
    </View>
    </View>
  );
}
