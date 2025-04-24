import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { Alert } from "react-native";
import { getRecipe } from "./RecipeAI";
import { ref, push, update, set } from "firebase/database";
import { database } from "../configuration/firebaseConfig";
import useCurrentUser from "../configuration/useCurrentUser";
import { useNavigation } from "@react-navigation/native";

// Refaktoroidut komponentit
import GeneratedRecipeView from "../components/showrecipes/GeneratedRecipeView";
import RecipeLoadingIndicator from "../components/showrecipes/RecipeLoadingIndicator";
import RecipeErrorMessage from "../components/showrecipes/RecipeErrorMessage";
import styles from "../components/showrecipes/ShowRecipeStyles";


const removeControlChars = (obj) => {
  // serialize → strip control chars → parse back
  const json = JSON.stringify(obj);
  const clean = json.replace(/[\u0000-\u001F]/g, "");
  return JSON.parse(clean);
};


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

  const { userId, loading: authLoading } = useCurrentUser();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
   const navigation = useNavigation();

  // Funktio reseptin hakemiseen
  const fetchRecipe = async () => {
    setLoading(true);
    const query = `Proteiinit: ${selectedProteins
      .concat(otherProtein || [])
      .join(", ")}, Hiilihydraatit: ${selectedCarbs
      .concat(otherCarb || [])
      .join(", ")}, Annoskoko: ${servingSize}, Ruokavaliot: ${selectedDiets.join(
      ", "
    )}`;

    try {
      const aiRecipe = await getRecipe(query);
      const clean    = removeControlChars(aiRecipe);
      setRecipe(clean);
    } catch (err) {
      Alert.alert("Virhe reseptin luomisessa", err.message);
    } finally {
      setLoading(false);
    }
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
    if (!recipe?.name || !recipe.ingredients?.length) {
      Alert.alert("Virhe", "Reseptiä ei voida tallentaa");
      return;
    }

    try {
      setSaving(true);
      const newRef     = push(ref(database, `users/${userId}/recipes`));
      const newRecipe  = { ...recipe, id: newRef.key };
      const sanitized  = removeControlChars(newRecipe);
      await set(ref(database, `users/${userId}/recipes/${newRef.key}`), sanitized);
      Alert.alert("Resepti tallennettu onnistuneesti!");
      navigation.navigate("Luo resepti"); //navigoi tallennettaessa takaisin UserInputFormiin
    } catch (error) {
      Alert.alert("Virhe tallennettaessa", error.message);
    } finally {
      setSaving(false);
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
