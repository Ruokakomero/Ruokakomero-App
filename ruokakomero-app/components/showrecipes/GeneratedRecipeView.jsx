// Tämä komponentti siirrettiin ShowRecipes.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)
import React from "react";
import { View, Text, Button } from "react-native";
import styles from "./ShowRecipeStyles";

const GeneratedRecipeView = ({ recipe, onSave, onRegenerate, saving }) => {
  return (
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
          onPress={onRegenerate}
          disabled={saving}
        />
        <View style={styles.buttonSpacing} />
        <Button
          title={saving ? "Tallennetaan..." : "Tallenna resepti"}
          onPress={onSave}
          disabled={saving}
          color="#007BFF"
        />
      </View>
    </View>
  );
};

export default GeneratedRecipeView;
