// Tämä komponentti siirrettiin Recipes.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)

import React from "react";
import { TouchableOpacity, View } from "react-native";
import TextThemed from "../../components/TextThemed";
import styles from "../../styles/recipesStyles";
import textStyles from "../../styles/textStyles";
import componentStyles from "../../styles/componentStyles";

const RecipeCard = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={componentStyles.cardContainer}>
        <View style={styles.recipeHeader}>
          <TextThemed style={textStyles.bodyLargeB}>{recipe.name}</TextThemed>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;
