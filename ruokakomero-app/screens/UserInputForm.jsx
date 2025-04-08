import React, { useState } from "react";
import { 
  View, Text, TouchableOpacity, StyleSheet, TextInput, 
  KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard 
} from "react-native";
import Slider from "@react-native-community/slider";

const UserInputForm = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProteins, setSelectedProteins] = useState([]);
  const [selectedCarbs, setSelectedCarbs] = useState([]);
  const [servingSize, setServingSize] = useState(2);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [otherProtein, setOtherProtein] = useState('');
  const [otherCarb, setOtherCarb] = useState('');

  const proteins = ["Kana", "Kala", "Naudanliha", "Possu", "Kasviproteiini", "Muu"];
  const carbs = ["Riisi", "Peruna", "Pasta", "Muu"];
  const diets = ["Vegaani", "Gluteeniton", "Laktoositon", "Keto", "Kasvis"];

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = () => {
    navigation.navigate("ShowRecipes", {
      selectedProteins,
      selectedCarbs,
      servingSize,
      selectedDiets,
      otherProtein,
      otherCarb,
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80} // Estää painikkeiden peittymisen
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.inner}>
            {currentStep === 1 && (
              <View style={styles.stepContainer}>
                <Text style={styles.header}>Valitse proteiini:</Text>
                {proteins.map((protein) => (
                  <TouchableOpacity
                    key={protein}
                    onPress={() => {
                      setSelectedProteins((prev) =>
                        prev.includes(protein) ? prev.filter((p) => p !== protein) : [...prev, protein]
                      );
                    }}
                    style={[
                      styles.optionButton,
                      selectedProteins.includes(protein) && styles.selectedOption,
                    ]}
                  >
                    <Text style={{ color: selectedProteins.includes(protein) ? "white" : "black" }}>
                      {protein}
                    </Text>
                  </TouchableOpacity>
                ))}

                {selectedProteins.includes("Muu") && (
                  <TextInput
                    style={styles.textInput}
                    placeholder="Kirjoita proteiini"
                    value={otherProtein}
                    onChangeText={setOtherProtein}
                    returnKeyType="done"
                  />
                )}

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                  <Text style={styles.buttonText}>Seuraava</Text>
                </TouchableOpacity>
              </View>
            )}

            {currentStep === 2 && (
              <View style={styles.stepContainer}>
                <Text style={styles.header}>Valitse hiilihydraatti:</Text>
                {carbs.map((carb) => (
                  <TouchableOpacity
                    key={carb}
                    onPress={() => {
                      setSelectedCarbs((prev) =>
                        prev.includes(carb) ? prev.filter((c) => c !== carb) : [...prev, carb]
                      );
                    }}
                    style={[
                      styles.optionButton,
                      selectedCarbs.includes(carb) && styles.selectedOption,
                    ]}
                  >
                    <Text style={{ color: selectedCarbs.includes(carb) ? "white" : "black" }}>
                      {carb}
                    </Text>
                  </TouchableOpacity>
                ))}

                {selectedCarbs.includes("Muu") && (
                  <TextInput
                    style={styles.textInput}
                    placeholder="Kirjoita hiilihydraatti"
                    value={otherCarb}
                    onChangeText={setOtherCarb}
                    returnKeyType="done"
                  />
                )}

                <TouchableOpacity style={styles.button} onPress={handleBack}>
                  <Text style={styles.buttonText}>Edellinen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                  <Text style={styles.buttonText}>Seuraava</Text>
                </TouchableOpacity>
              </View>
            )}

            {currentStep === 3 && (
              <View style={styles.stepContainer}>
                <Text style={styles.header}>Annoskoko: {servingSize} annosta</Text>
                <Slider
                  minimumValue={1}
                  maximumValue={10}
                  step={1}
                  value={servingSize}
                  onValueChange={setServingSize}
                  style={styles.slider}
                />
                <TouchableOpacity style={styles.button} onPress={handleBack}>
                  <Text style={styles.buttonText}>Edellinen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                  <Text style={styles.buttonText}>Seuraava</Text>
                </TouchableOpacity>
              </View>
            )}

            {currentStep === 4 && (
              <View style={styles.stepContainer}>
                <Text style={styles.header}>Erityisruokavaliot:</Text>
                {diets.map((diet) => (
                  <TouchableOpacity
                    key={diet}
                    onPress={() =>
                      setSelectedDiets((prev) =>
                        prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
                      )
                    }
                    style={[
                      styles.optionButton,
                      selectedDiets.includes(diet) && styles.selectedOption,
                    ]}
                  >
                    <Text style={{ color: selectedDiets.includes(diet) ? "white" : "black" }}>
                      {diet}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.button} onPress={handleBack}>
                  <Text style={styles.buttonText}>Edellinen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Näytä reseptit</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  stepContainer: {
    width: "100%",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },
  optionButton: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#4CAF50",
  },
  slider: {
    width: "80%",
    marginVertical: 30,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  textInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    width: "80%",
    marginTop: 10,
  },
});

export default UserInputForm;
