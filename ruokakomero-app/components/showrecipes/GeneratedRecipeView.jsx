// Tämä komponentti siirrettiin ShowRecipes.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)
import React from "react";
import { View, Text, Button, TouchableOpacity  } from "react-native";
import styles from "./ShowRecipeStyles";

const GeneratedRecipeView = ({ recipe, onSave, onRegenerate, saving }) => {
  return (
    <View style={styles.recipeCard}>
      <Text style={styles.recipeTitle}>{recipe.name}</Text>
      <Text style={styles.sectionTitle}>Annoskoko:</Text>
      <Text style={styles.ingredientText}>{recipe.servingSize} annosta</Text>
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
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.defaultButton,
            saving && styles.disabledButton,
          ]}
          onPress={onRegenerate}
          disabled={saving}
        >
          <Text style={styles.buttonText}>Luo uusi resepti</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.defaultButton,
            saving && styles.disabledButton,
          ]}
          onPress={onSave}
          disabled={saving}
        >
          <Text style={styles.buttonText}>
            {saving ? "Tallennetaan..." : "Tallenna resepti"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GeneratedRecipeView;
