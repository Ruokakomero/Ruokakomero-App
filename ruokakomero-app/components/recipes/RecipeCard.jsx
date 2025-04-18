// components/recipes/RecipeCard.jsx
import React from "react";
import { TouchableOpacity, View, Animated } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import TextThemed from "../../components/TextThemed";
import styles from "../../styles/recipesStyles";
import textStyles from "../../styles/textStyles";
import componentStyles from "../../styles/componentStyles";
import IconButton from "../../components/IconButton";

const RecipeCard = ({ recipe, onPress, onDelete }) => {
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        onPress={() => onDelete(recipe.id)}
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 64,
          marginVertical: 16,
        }}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <IconButton onPress={() => onDelete(recipe.id)} iconType="remove" iconSize="small" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity onPress={onPress}>
        <View style={componentStyles.cardContainer}>
          <View style={styles.recipeHeader}>
            <TextThemed style={textStyles.bodyLargeB}>{recipe.name}</TextThemed>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default RecipeCard;
