// Tämä komponentti siirrettiin ShowRecipes.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)
import React from "react";
import { ActivityIndicator } from "react-native";

const RecipeLoadingIndicator = () => {
  return <ActivityIndicator size="large" color="#389C9A" />;
};

export default RecipeLoadingIndicator;
