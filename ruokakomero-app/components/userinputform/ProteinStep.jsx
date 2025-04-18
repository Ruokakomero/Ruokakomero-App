// Tämä komponentti siirrettiin UserInputForm.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)

import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

const ProteinStep = ({ selectedProteins, setSelectedProteins, otherProtein, setOtherProtein, handleNext }) => {
  const proteins = ["Kana", "Kala", "Naudanliha", "Possu", "Kasviproteiini", "Muu"];

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>Valitse proteiini:</Text>
      {proteins.map((protein) => (
        <TouchableOpacity
          key={protein}
          onPress={() => {
            setSelectedProteins((prev) =>
              prev.includes(protein) ? prev.filter((p) => p !== protein) : [...prev, protein]
            );
          }}
          style={{
            backgroundColor: selectedProteins.includes(protein) ? "#4CAF50" : "#f8f8f8",
            padding: 15,
            marginVertical: 10,
            borderRadius: 10,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text style={{ color: selectedProteins.includes(protein) ? "white" : "black" }}>
            {protein}
          </Text>
        </TouchableOpacity>
      ))}

      {selectedProteins.includes("Muu") && (
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
          placeholder="Kirjoita proteiini"
          value={otherProtein}
          onChangeText={setOtherProtein}
          returnKeyType="done"
        />
      )}

      <TouchableOpacity
        style={{
          backgroundColor: "#4CAF50",
          padding: 15,
          borderRadius: 10,
          width: "80%",
          alignItems: "center",
        }}
        onPress={handleNext}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Seuraava</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProteinStep;
