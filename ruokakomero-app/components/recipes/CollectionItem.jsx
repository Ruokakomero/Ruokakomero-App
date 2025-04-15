// components/recipes/CollectionItem.jsx

import React, { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import TextThemed from "../../components/TextThemed";
import ButtonComponent from "../../components/ButtonComponent";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/recipesStyles";
import textStyles from "../../styles/textStyles";
import componentStyles from "../../styles/componentStyles";

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
    <View style={styles.collectionItem}>
      <View style={styles.collectionHeader}>
        <TouchableOpacity onPress={() => onToggleMenu(collection.id)}>
          <TextThemed style={textStyles.titleLargeB}>
            {collection.name}
          </TextThemed>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEdit(collection)}>
          <TextThemed style={{ color: "blue", fontSize: 14 }}>Muokkaa</TextThemed>
        </TouchableOpacity>
      </View>
      {isMenuVisible && (
        <View style={styles.menuOptions}>
          <ButtonComponent
            content="Poista"
            onPress={() => onDelete(collection.id)}
            type="danger"
          />
        </View>
      )}
      <FlatList
        data={collection.recipes}
        keyExtractor={(id) => id}
        renderItem={({ item: recipeId }) => (
          <View style={styles.recipeItem}>
            <TextThemed style={textStyles.bodyLarge}>
              {recipeDetails[recipeId] || "Ladataan..."}
            </TextThemed>
            <TouchableOpacity onPress={() => onRemoveRecipe(collection.id, recipeId)}>
              <TextThemed style={{ color: "red", fontSize: 14 }}>Poista</TextThemed>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.addRecipeButton}
            onPress={() => onOpenAddRecipe(collection.id)}
          >
            <Ionicons name="add-circle" size={24} color="green" />
          </TouchableOpacity>
        }
      />
    </View>
  );
}
