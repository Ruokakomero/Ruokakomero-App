// Tämä komponentti siirrettiin UserInputForm.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)

import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

const CarbStep = ({ selectedCarbs, setSelectedCarbs, otherCarb, setOtherCarb, handleNext, handleBack }) => {
  const carbs = ["Riisi", "Peruna", "Pasta", "Muu"];

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>Valitse hiilihydraatti:</Text>
      {carbs.map((carb) => (
        <TouchableOpacity
          key={carb}
          onPress={() => {
            setSelectedCarbs((prev) =>
              prev.includes(carb) ? prev.filter((c) => c !== carb) : [...prev, carb]
            );
          }}
          style={{
            backgroundColor: selectedCarbs.includes(carb) ? "#4CAF50" : "#f8f8f8",
            padding: 15,
            marginVertical: 10,
            borderRadius: 10,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text style={{ color: selectedCarbs.includes(carb) ? "white" : "black" }}>
            {carb}
          </Text>
        </TouchableOpacity>
      ))}

      {selectedCarbs.includes("Muu") && (
        <TextInput
          style={{
            height: 40,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 10,
            width: "80%",
            marginTop: 10,
          }}
          placeholder="Kirjoita hiilihydraatti"
          value={otherCarb}
          onChangeText={setOtherCarb}
          returnKeyType="done"
        />
      )}

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
          onPress={handleNext}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Seuraava</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CarbStep;
