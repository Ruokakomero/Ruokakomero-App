// components/recipes/CollectionItem.jsx
import React from "react";
import { FlatList, TouchableOpacity, View, Animated } from "react-native";
import TextThemed from "../../components/TextThemed";
import IconButton from "../../components/IconButton";
import styles from "../../styles/recipesStyles";
import textStyles from "../../styles/textStyles";
import ButtonComponent from "../ButtonComponent";
import { Swipeable } from "react-native-gesture-handler";
import componentStyles from "../../styles/componentStyles";

const CollectionItem = ({
  collection,
  recipeDetails,
  isMenuVisible,
  onDelete,
  onRemoveRecipe,
  onOpenAddRecipe,
}) => {
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity style={componentStyles.swipeableContainer}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <IconButton
            onPress={() => onDelete(collection.id)}
            iconType="remove"
            iconColor="white"
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      style={styles.collectionWrapper}
    >
      <View style={styles.collectionHeader}>
        <TextThemed style={textStyles.titleLargeB}>
          {collection.name}
        </TextThemed>
      </View>
      <View style={styles.collectionItem}>
        {isMenuVisible && (
          <View style={styles.menuOptions}>
            <IconButton
              iconType="remove"
              onPress={() => onDelete(collection.id)}
            />
          </View>
        )}
        <FlatList
          style={styles.recipeList}
          data={collection.recipes}
          keyExtractor={(id) => id}
          renderItem={({ item: recipeId }) => (
            <View style={styles.recipeItem}>
              <TextThemed style={textStyles.bodyLarge}>
                {recipeDetails[recipeId] || "Ladataan..."}
              </TextThemed>
              <IconButton
                onPress={() => onRemoveRecipe(collection.id, recipeId)}
                iconType="remove"
                iconSize="small"
              />
            </View>
          )}
          ListFooterComponent={
            <IconButton
              onPress={() => onOpenAddRecipe(collection.id)}
              iconSize="small"
            />
          }
        />
      </View>
    </Swipeable>
  );
};

export default CollectionItem;
