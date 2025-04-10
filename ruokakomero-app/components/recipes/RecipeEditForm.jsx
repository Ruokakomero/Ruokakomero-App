// Tämä komponentti siirrettiin Recipes.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)

import React from "react";
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";
import TextThemed from "../../components/TextThemed";
import InputFieldComponent from "../../components/InputFieldComponent";
import ButtonComponent from "../../components/ButtonComponent";
import styles from "../../styles/recipesStyles";

const RecipeEditForm = ({
  visible,
  recipe,
  setRecipe,
  ingredientName,
  setIngredientName,
  instructionStep,
  setInstructionStep,
  handleEditRecipe,
  confirmClose,
  onClose,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContentEdit}>
              <ScrollView
                style={{ width: "100%" }}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <TextThemed style={styles.header}>Muokkaa Reseptiä</TextThemed>

                <InputFieldComponent
                  placeholder="Anna reseptin nimi"
                  header="Reseptin nimi"
                  value={recipe.name}
                  onChangeText={(text) =>
                    setRecipe({ ...recipe, name: text })
                  }
                />

                <InputFieldComponent
                  placeholder="Lisää kuvan URL (valinnainen)"
                  header="Kuvan URL"
                  value={recipe.image}
                  onChangeText={(text) =>
                    setRecipe({ ...recipe, image: text })
                  }
                />

                {/* Ainesosien editointi */}
                <TextThemed style={styles.subHeader}>Ainesosat</TextThemed>
                {recipe.ingredients.map((item, index) => (
                  <InputFieldComponent
                    key={index}
                    placeholder={`Ainesosa ${index + 1}`}
                    header={`Ainesosa ${index + 1}`}
                    value={item.name}
                    onChangeText={(text) => {
                      const updatedIngredients = [...recipe.ingredients];
                      updatedIngredients[index].name = text;
                      setRecipe({ ...recipe, ingredients: updatedIngredients });
                    }}
                  />
                ))}
                <InputFieldComponent
                  placeholder="Uusi ainesosa"
                  header="Uusi ainesosa"
                  value={ingredientName}
                  onChangeText={setIngredientName}
                />
                <ButtonComponent
                  content="Lisää Ainesosa"
                  onPress={() => {
                    if (!ingredientName) return;
                    setRecipe({
                      ...recipe,
                      ingredients: [
                        ...recipe.ingredients,
                        { name: ingredientName, quantity: "", unit: "kg" },
                      ],
                    });
                    setIngredientName("");
                  }}
                />

                {/* Ohjeiden editointi */}
                <TextThemed style={styles.subHeader}>Ohjeet</TextThemed>
                {recipe.instructions.map((item, index) => (
                  <InputFieldComponent
                    key={index}
                    placeholder={`Ohje ${index + 1}`}
                    header={`Ohje ${index + 1}`}
                    value={item}
                    onChangeText={(text) => {
                      const updatedInstructions = [...recipe.instructions];
                      updatedInstructions[index] = text;
                      setRecipe({ ...recipe, instructions: updatedInstructions });
                    }}
                  />
                ))}
                <InputFieldComponent
                  placeholder="Lisää uusi ohje"
                  header="Uusi ohje"
                  value={instructionStep}
                  onChangeText={setInstructionStep}
                />
                <ButtonComponent
                  content="Lisää Ohje"
                  onPress={() => {
                    if (!instructionStep) return;
                    setRecipe({
                      ...recipe,
                      instructions: [...recipe.instructions, instructionStep],
                    });
                    setInstructionStep("");
                  }}
                />

                <ButtonComponent
                  content="Tallenna muutokset"
                  onPress={() => {
                    handleEditRecipe();
                    onClose();
                  }}
                />

                <ButtonComponent
                  content="Sulje"
                  onPress={confirmClose}
                />
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RecipeEditForm;
