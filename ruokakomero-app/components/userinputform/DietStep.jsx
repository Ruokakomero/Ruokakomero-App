// Tämä komponentti siirrettiin UserInputForm.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const DietStep = ({ selectedDiets, setSelectedDiets, handleBack, handleSubmit }) => {
  const diets = ["Vegaani", "Gluteeniton", "Laktoositon", "Keto", "Kasvis"];

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>Valitse ruokavalio:</Text>
      {diets.map((diet) => (
        <TouchableOpacity
          key={diet}
          onPress={() => {
            setSelectedDiets((prev) =>
              prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
            );
          }}
          style={{
            backgroundColor: selectedDiets.includes(diet) ? "#4CAF50" : "#f8f8f8",
            padding: 15,
            marginVertical: 10,
            borderRadius: 10,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text style={{ color: selectedDiets.includes(diet) ? "white" : "black" }}>
            {diet}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#f8f8f8",
            padding: 15,
            borderRadius: 10,
            width: "45%",
            alignItems: "center",
          }}
          onPress={handleBack}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Edellinen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#4CAF50",
            padding: 15,
            borderRadius: 10,
            width: "45%",
            alignItems: "center",
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Näytä reseptit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DietStep;
