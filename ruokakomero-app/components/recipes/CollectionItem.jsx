// components/recipes/CollectionItem.jsx
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import TextThemed from "../../components/TextThemed";
import IconButton from "../../components/IconButton";
import styles from "../../styles/recipesStyles";
import textStyles from "../../styles/textStyles";
import ButtonComponent from "../ButtonComponent";

export default function CollectionItem({
  collection,
  recipeDetails,
  onToggleMenu,
  isMenuVisible,
  onEdit,
  onDelete,
  onRemoveRecipe,
  onOpenAddRecipe,
}) {
  return (
    <TouchableOpacity
      style={styles.collectionWrapper}
      onLongPress={() => onToggleMenu(collection.id)}
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
    </TouchableOpacity>
  );
}
