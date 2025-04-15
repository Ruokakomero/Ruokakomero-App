// components/recipes/CollectionItem.jsx

import React, { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import TextThemed from "../../components/TextThemed";
import ButtonComponent from "../../components/ButtonComponent";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/recipesStyles";
import textStyles from "../../styles/textStyles";
import IconButton from "../IconButton";
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
        <IconButton
          iconType="edit"
          onPress={() => onEdit(collection)}
          iconSize="small"
        />
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
            <IconButton
              onPress={() => onRemoveRecipe(collection.id, recipeId)}
              iconType="remove"
              iconSize="small"
            />
          </View>
        )}
        ListFooterComponent={
          <IconButton  onPress={() => onOpenAddRecipe(collection.id)} iconSize="small"/>
        
        }
      />
    </View>
  );
}
