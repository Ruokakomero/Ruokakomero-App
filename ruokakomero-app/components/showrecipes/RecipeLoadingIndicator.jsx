// Tämä komponentti siirrettiin ShowRecipes.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)
import React from "react";
import { ActivityIndicator } from "react-native";

const RecipeLoadingIndicator = () => {
  return <ActivityIndicator size="large" color="#4CAF50" />;
};

export default RecipeLoadingIndicator;
