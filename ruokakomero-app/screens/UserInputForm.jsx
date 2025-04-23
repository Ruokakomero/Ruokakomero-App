import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import ProteinStep from "../components/userinputform/ProteinStep";
import CarbStep from "../components/userinputform/CarbStep";
import ServingSizeStep from "../components/userinputform/ServingSizeStep";
import DietStep from "../components/userinputform/DietStep";

import { auth, database } from "../configuration/firebaseConfig";
import { ref, get, child } from "firebase/database";

const UserInputForm = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProteins, setSelectedProteins] = useState([]);
  const [selectedCarbs, setSelectedCarbs] = useState([]);
  const [servingSize, setServingSize] = useState(2);
  const [selectedDiets, setSelectedDiets] = useState({});
  const [otherProtein, setOtherProtein] = useState("");
  const [otherCarb, setOtherCarb] = useState("");

  // Haetaan kirjautunut käyttäjä
  useEffect(() => {
    const fetchUserDiet = async () => {
      const user = auth.currentUser;

      if (!user) {
        console.warn("Ei kirjautunutta käyttäjää.");
        return;
      }

      // Haetaan käyttäjän ruokavalio
      try {
        const userRef = ref(database);
        const snapshot = await get(child(userRef, `users/${user.uid}/diet`));

        if (snapshot.exists()) {
          const data = snapshot.val();
          setSelectedDiets(data.diet || {});
        } else {
          console.warn("Käyttäjätietoja ei löytynyt.");
        }
      } catch (error) {
        console.error("Virhe haettaessa käyttäjän ruokavaliota:", error);
      }
    };

    fetchUserDiet();
  }, []);

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
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
            {currentStep === 1 && (
              <ProteinStep
                selectedProteins={selectedProteins}
                setSelectedProteins={setSelectedProteins}
                otherProtein={otherProtein}
                setOtherProtein={setOtherProtein}
                handleNext={handleNext}
                selectedDiets={selectedDiets}
              />
            )}

            {currentStep === 2 && (
              <CarbStep
                selectedCarbs={selectedCarbs}
                setSelectedCarbs={setSelectedCarbs}
                otherCarb={otherCarb}
                setOtherCarb={setOtherCarb}
                handleNext={handleNext}
                handleBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <ServingSizeStep
                servingSize={servingSize}
                setServingSize={(value) => setServingSize(Math.round(value))}
                handleNext={handleNext}
                handleBack={handleBack}
              />
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
