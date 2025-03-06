import React, { useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, Slider } from "react-native";

const UserInputForm = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProteins, setSelectedProteins] = useState([]);
  const [selectedCarbs, setSelectedCarbs] = useState([]);
  const [servingSize, setServingSize] = useState(2);
  const [selectedDiets, setSelectedDiets] = useState([]);

  const proteins = ["Kana", "Kala", "Naudanliha", "Tofu", "Papu"];
  const carbs = ["Riisi", "Peruna", "Pasta", "Kvinoa", "Leipä"];
  const diets = ["Vegaani", "Gluteeniton", "Laktoositon", "Keto", "Kasvis"];

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);
  const handleSubmit = () => {
    onSubmit({ selectedProteins, selectedCarbs, servingSize, selectedDiets });
  };

  return (
    <View>
      {currentStep === 1 && (
        <View>
          <Text>Valitse proteiinit:</Text>
          {proteins.map((protein) => (
            <TouchableOpacity
              key={protein}
              onPress={() =>
                setSelectedProteins((prev) =>
                  prev.includes(protein)
                    ? prev.filter((p) => p !== protein)
                    : [...prev, protein]
                )
              }
            >
              <Text style={{ color: selectedProteins.includes(protein) ? "blue" : "black" }}>{protein}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Seuraava" onPress={handleNext} />
        </View>
      )}

      {currentStep === 2 && (
        <View>
          <Text>Valitse hiilarit:</Text>
          {carbs.map((carb) => (
            <TouchableOpacity
              key={carb}
              onPress={() =>
                setSelectedCarbs((prev) =>
                  prev.includes(carb) ? prev.filter((c) => c !== carb) : [...prev, carb]
                )
              }
            >
              <Text style={{ color: selectedCarbs.includes(carb) ? "blue" : "black" }}>{carb}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Edellinen" onPress={handleBack} />
          <Button title="Seuraava" onPress={handleNext} />
        </View>
      )}

      {currentStep === 3 && (
        <View>
          <Text>Annoskoko: {servingSize} annosta</Text>
          <Slider
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={servingSize}
            onValueChange={setServingSize}
          />
          <Button title="Edellinen" onPress={handleBack} />
          <Button title="Seuraava" onPress={handleNext} />
        </View>
      )}

      {currentStep === 4 && (
        <View>
          <Text>Erityisruokavaliot:</Text>
          {diets.map((diet) => (
            <TouchableOpacity
              key={diet}
              onPress={() =>
                setSelectedDiets((prev) =>
                  prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
                )
              }
            >
              <Text style={{ color: selectedDiets.includes(diet) ? "blue" : "black" }}>{diet}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Edellinen" onPress={handleBack} />
          <Button title="Näytä reseptit" onPress={handleSubmit} />
        </View>
      )}
    </View>
  );
};

export default UserInputForm;