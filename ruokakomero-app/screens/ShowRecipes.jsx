import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { Alert } from "react-native";
import { getRecipe } from "./RecipeAI";
import { ref, push, update } from "firebase/database";
import { database } from "../configuration/firebaseConfig";

// Refaktoroidut komponentit
import GeneratedRecipeView from "../components/showrecipes/GeneratedRecipeView";
import RecipeLoadingIndicator from "../components/showrecipes/RecipeLoadingIndicator";
import RecipeErrorMessage from "../components/showrecipes/RecipeErrorMessage";
import styles from "../components/showrecipes/ShowRecipeStyles";

// Otetaan UserInputFormista lähetetyt tiedot vastaan
const ShowRecipes = ({ route }) => {
  const {
    selectedProteins,
    selectedCarbs,
    servingSize,
    selectedDiets,
    otherProtein,
    otherCarb,
  } = route.params;

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Funktio reseptin hakemiseen
  const fetchRecipe = async () => {
    setLoading(true);
    const query = `Proteiinit: ${selectedProteins
      .concat(otherProtein || [])
      .join(", ")}, Hiilihydraatit: ${selectedCarbs
      .concat(otherCarb || [])
      .join(
        ", "
      )}, Annoskoko: ${servingSize}, Ruokavaliot: ${selectedDiets.join(", ")}`;

    const aiRecipe = await getRecipe(query);
    setRecipe(aiRecipe);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipe();
  }, [
    selectedProteins,
    selectedCarbs,
    servingSize,
    selectedDiets,
    otherProtein,
    otherCarb,
  ]);

  // Funktio, joka regeneroi reseptin
  const regenerateRecipe = () => {
    setRecipe(null);
    fetchRecipe();
  };

  // Funktio reseptin tallentamiseksi tietokantaan
  const saveRecipeToDatabase = async () => {
    if (!recipe || !recipe.name || recipe.ingredients.length === 0) {
      Alert.alert("Virhe", "Reseptiä ei voida tallentaa");
      return;
    }

    try {
      setSaving(true);

      const newRecipeRef = push(ref(database, "recipes/"));
      const newRecipeKey = newRecipeRef.key;

      const newRecipe = { ...recipe, id: newRecipeKey };

      await update(ref(database, `recipes/${newRecipeKey}`), newRecipe);

      setSaving(false);

      //Onnistumisilmoitus
      Alert.alert("Resepti tallennettu onnistuneesti!", [{ text: "OK" }]);
    } catch (error) {
      setSaving(false);
      Alert.alert(
        "Virhe",
        "Reseptin tallentaminen epäonnistui: " + error.message
      );
      console.error("Virhe reseptiä tallennettaessa:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Tekoälyn ehdottama resepti</Text>
      {loading ? (
        <RecipeLoadingIndicator />
      ) : recipe ? (
        <GeneratedRecipeView
          recipe={recipe}
          onSave={saveRecipeToDatabase}
          onRegenerate={regenerateRecipe}
          saving={saving}
        />
      ) : (
        <RecipeErrorMessage onRetry={regenerateRecipe} />
      )}
    </ScrollView>
  );
};

export default ShowRecipes;
