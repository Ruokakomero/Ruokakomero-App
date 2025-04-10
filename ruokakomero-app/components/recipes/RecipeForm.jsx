// Tämä komponentti siirrettiin Recipes.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)

import React from "react";
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import TextThemed from "../../components/TextThemed";
import InputFieldComponent from "../../components/InputFieldComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import styles from "../../styles/recipesStyles";
import textStyles from "../../styles/textStyles";

const RecipeForm = ({
  visible,
  recipe,
  setRecipe,
  currentStep,
  setCurrentStep,
  ingredientName,
  setIngredientName,
  ingredientQuantity,
  setIngredientQuantity,
  ingredientUnit,
  instructionStep,
  setInstructionStep,
  handleAddIngredient,
  handleAddInstruction,
  handleAddRecipe,
  resetForm,
  onClose,
  unitSettings,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContentCreate}>
              <ScrollView keyboardShouldPersistTaps="handled">
                <TextThemed style={textStyles.listHeader}>
                  {currentStep === 1
                    ? "Perustiedot"
                    : currentStep === 2
                    ? "Lisää Ainesosia"
                    : "Lisää Ohjeita"}
                </TextThemed>

                {currentStep === 1 && (
                  <>
                    <InputFieldComponent
                      placeholder="Reseptin nimi"
                      header="Reseptin nimi"
                      value={recipe.name}
                      onChangeText={(text) =>
                        setRecipe({ ...recipe, name: text })
                      }
                    />
                    <InputFieldComponent
                      placeholder="Kuvan URL (valinnainen)"
                      header="Kuvan URL"
                      value={recipe.image}
                      onChangeText={(text) =>
                        setRecipe({ ...recipe, image: text })
                      }
                    />
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <InputFieldComponent
                      placeholder="Ainesosan nimi"
                      header="Ainesosan nimi"
                      value={ingredientName}
                      onChangeText={setIngredientName}
                    />
                    <TextThemed style={styles.subHeader}>
                      Määrä: {ingredientQuantity} {ingredientUnit}
                    </TextThemed>
                    <Slider
                      style={{ width: "100%", height: 40 }}
                      minimumValue={unitSettings[ingredientUnit].min}
                      maximumValue={unitSettings[ingredientUnit].max}
                      step={unitSettings[ingredientUnit].step}
                      value={ingredientQuantity}
                      onValueChange={setIngredientQuantity}
                    />
                    <Picker
                      selectedValue={ingredientUnit}
                      style={styles.input}
                      onValueChange={(itemValue) => setIngredientUnit(itemValue)}
                    >
                      <Picker.Item label="kg" value="kg" />
                      <Picker.Item label="g" value="g" />
                      <Picker.Item label="l" value="l" />
                      <Picker.Item label="ml" value="ml" />
                      <Picker.Item label="kpl" value="kpl" />
                    </Picker>
                    <ButtonComponent
                      content="Lisää Ainesosa"
                      onPress={handleAddIngredient}
                    />
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <InputFieldComponent
                      placeholder="Kirjoita ohje"
                      header="Ohje"
                      value={instructionStep}
                      onChangeText={setInstructionStep}
                    />
                    <ButtonComponent
                      content="Lisää Ohje"
                      onPress={handleAddInstruction}
                    />
                  </>
                )}

                {/* Step Navigation Buttons */}
                <View style={styles.navButtons}>
                  {currentStep > 1 && (
                    <ButtonComponent
                      content="Edellinen"
                      onPress={() => setCurrentStep(currentStep - 1)}
                    />
                  )}
                  {currentStep < 3 ? (
                    <ButtonComponent
                      content="Seuraava"
                      onPress={() => setCurrentStep(currentStep + 1)}
                    />
                  ) : (
                    <ButtonComponent
                      content="Tallenna"
                      onPress={() => {
                        handleAddRecipe();
                        resetForm();
                      }}
                    />
                  )}
                </View>
              </ScrollView>
              <ButtonComponent content="Sulje" onPress={onClose} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RecipeForm;
