// components/recipes/AddRecipeModal.jsx
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import TextThemed from "../../components/TextThemed";
import BaseModal from "../../components/BaseModal";
import styles from "../../styles/recipesStyles";
import textStyles from "../../styles/textStyles";
import ButtonComponent from "../../components/ButtonComponent";
import componentStyles from "../../styles/componentStyles";

export default function AddRecipeModal({ visible, availableRecipes, onAddRecipe, onClose }) {
  return (
    <BaseModal visible={visible} title="Valitse resepti lisättäväksi" onClose={onClose}>
      <FlatList
        data={availableRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={componentStyles.selectableListItem} onPress={() => onAddRecipe(item.id)}>
            <TextThemed style={textStyles.bodyLarge}>{item.name}</TextThemed>
          </TouchableOpacity>
        )}
      />
    </BaseModal>
  );
}
