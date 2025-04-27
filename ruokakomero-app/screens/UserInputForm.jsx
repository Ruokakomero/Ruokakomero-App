import React, { useState, useEffect } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";

import ProteinStep from "../components/userinputform/ProteinStep";
import CarbStep from "../components/userinputform/CarbStep";
import ServingSizeStep from "../components/userinputform/ServingSizeStep";
import DietStep from "../components/userinputform/DietStep";
import styles from "../styles/userInputFormStyles";

import useCurrentUser from "../configuration/useCurrentUser";
import { ref, onValue } from "firebase/database";
import { database } from "../configuration/firebaseConfig";

const UserInputForm = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProteins, setSelectedProteins] = useState([]);
  const [selectedCarbs, setSelectedCarbs] = useState([]);
  const [servingSize, setServingSize] = useState(2);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [otherProtein, setOtherProtein] = useState("");
  const [otherCarb, setOtherCarb] = useState("");
  const [dietOptions, setDietOptions] = useState([]);
  const { user, userId, loading: userLoading } = useCurrentUser();

  useEffect(() => {
    if (userLoading || !userId) return;

    const dietRef = ref(database, `users/${userId}/diet`);
    const unsubscribe = onValue(dietRef, (snapshot) => {
      const dietObj = snapshot.val() || {};
      const opts = Object.keys(dietObj);
      setDietOptions(opts);
      setSelectedDiets(opts.filter((opt) => dietObj[opt]));
    });

    return () => unsubscribe();
  }, [userId, userLoading]);

  const handleNext = () => {
    if (currentStep === 2) {
      const hasProtein =
        selectedProteins.length > 0 || otherProtein.trim() !== "";
      if (!hasProtein) {
        Alert.alert(
          "Valitse proteiini",
          "Valitse vähintään yksi proteiini tai syötä muu proteiini."
        );
        return;
      }
    }

    if (currentStep === 3) {
      const hasCarb = selectedCarbs.length > 0 || otherCarb.trim() !== "";
      if (!hasCarb) {
        Alert.alert(
          "Valitse hiilihydraatti",
          "Valitse vähintään yksi hiilihydraatti tai syötä muu hiilihydraatti."
        );
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

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
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            {currentStep === 1 && (
              <DietStep
                dietOptions={dietOptions}
                selectedDiets={selectedDiets}
                setSelectedDiets={setSelectedDiets}
                handleNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <ProteinStep
                selectedProteins={selectedProteins}
                setSelectedProteins={setSelectedProteins}
                otherProtein={otherProtein}
                setOtherProtein={setOtherProtein}
                handleNext={handleNext}
                handleBack={handleBack}
                selectedDiets={selectedDiets}
              />
            )}

            {currentStep === 3 && (
              <CarbStep
                selectedCarbs={selectedCarbs}
                setSelectedCarbs={setSelectedCarbs}
                otherCarb={otherCarb}
                setOtherCarb={setOtherCarb}
                handleNext={handleNext}
                handleBack={handleBack}
              />
            )}

            {currentStep === 4 && (
              <ServingSizeStep
                servingSize={servingSize}
                setServingSize={(value) => setServingSize(Math.round(value))}
                handleNext={handleSubmit}
                handleBack={handleBack}
              />
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default UserInputForm;
