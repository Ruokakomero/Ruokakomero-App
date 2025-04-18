// Tämä komponentti siirrettiin UserInputForm.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

const ServingSizeStep = ({ servingSize, setServingSize, handleNext, handleBack }) => {
  return (
    <View style={{ alignItems: "center", width: "100%" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>
        Annoskoko: {servingSize} annosta
      </Text>

      <Slider
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={servingSize}
        onValueChange={setServingSize}
        style={{ width: "80%", marginVertical: 30 }}
        minimumTrackTintColor="#4CAF50"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#4CAF50"
      />

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

export default ServingSizeStep;
