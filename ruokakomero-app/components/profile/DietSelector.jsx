// Tämä komponentti siirrettiin Profile.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const dietOptions = {
  vege: "Vege",
  glutenFree: "Gluteeniton",
  lactoseFree: "Laktoositon",
  vegan: "Vegaani",
  nutAllergy: "Pähkinäallergia",
  halal: "Halal",
};

export default function DietSelector({ userDiet, toggleDiet }) {
  return (
    <View>
      <Text style={styles.subtitle}>Ruokavalio</Text>
      <View style={styles.dietContainer}>
        {Object.keys(dietOptions).map((dietType) => (
          <TouchableOpacity
            key={dietType}
            style={[
              styles.dietButton,
              { backgroundColor: userDiet[dietType] ? "#98fb98" : "#f0f0f0" },
            ]}
            onPress={() => toggleDiet(dietType)}
          >
            <Text>{dietOptions[dietType]}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  dietContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dietButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 5,
    marginRight: 5,
  },
});
