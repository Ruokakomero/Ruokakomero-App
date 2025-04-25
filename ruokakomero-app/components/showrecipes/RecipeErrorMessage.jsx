// Tämä komponentti siirrettiin ShowRecipes.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)
import React from "react";
import { View, Text, Button } from "react-native";
import styles from "../../styles/ShowRecipeStyles";

const RecipeErrorMessage = ({ onRetry }) => {
  return (
    <View>
      <Text style={styles.errorText}>Reseptiä ei voitu ladata.</Text>
      <Button title="Yritä uudelleen" onPress={onRetry} />
    </View>
  );
};

export default RecipeErrorMessage;
