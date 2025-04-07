import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Button,
} from "react-native";
import { getRecipe } from "./RecipeAI";
import { ref, push, update } from "firebase/database";
import { database } from "../constants/firebaseConfig";


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
      Alert.alert("Resepti tallennettu onnistuneesti!", [
        { text: "OK" },
      ]);
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
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : recipe ? (
        <View style={styles.recipeCard}>
          <Text style={styles.recipeTitle}>{recipe.name}</Text>
          <Text style={styles.sectionTitle}>Ainesosat:</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredientText}>
              - {ingredient.name}: {ingredient.quantity} {ingredient.unit}
            </Text>
          ))}
          <View style={styles.sectionSpacing} />
          <Text style={styles.sectionTitle}>Ohje:</Text>
          {recipe.instructions.map((step, index) => (
            <Text key={index} style={styles.instructionText}>
              {index + 1}. {step}
            </Text>
          ))}
          <View style={styles.buttonContainer}>
            <Button
              title="Luo uusi resepti"
              onPress={regenerateRecipe}
              disabled={saving}
            />
            <View style={styles.buttonSpacing} />
            <Button
              title={saving ? "Tallennetaan..." : "Tallenna resepti"}
              onPress={saveRecipeToDatabase}
              disabled={saving}
              color="#007BFF"
            />
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.errorText}>Reseptiä ei voitu ladata.</Text>
          <Button title="Yritä uudelleen" onPress={regenerateRecipe} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  recipeCard: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    width: "100%",
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  ingredientText: {
    fontSize: 14,
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 14,
    marginBottom: 10,
  },
  sectionSpacing: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: "column",
    width: "100%",
  },
  buttonSpacing: {
    height: 10,
  },
});

export default ShowRecipes;