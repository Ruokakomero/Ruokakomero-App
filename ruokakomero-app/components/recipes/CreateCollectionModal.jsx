// components/recipes/CreateCollectionModal.jsx
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import TextThemed from "../../components/TextThemed";
import InputFieldComponent from "../../components/InputFieldComponent";
import ButtonComponent from "../../components/ButtonComponent";
import BaseModal from "../../components/BaseModal";
import styles from "../../styles/recipesStyles";
import textStyles from "../../styles/textStyles";
import componentStyles from "../../styles/componentStyles";

export default function CreateCollectionModal({
  visible,
  collectionName,
  setCollectionName,
  recipes,
  selectedRecipes,
  toggleRecipeSelection,
  onCreate,
  onClose,
}) {
  return (
    <BaseModal visible={visible} title="Luo Kokoelma" onClose={onClose} modalStyle="list">
      <InputFieldComponent
        placeholder="Kokoelman nimi"
        header="Kokoelman nimi"
        value={collectionName}
        onChangeText={setCollectionName}
      />
      <TextThemed style={textStyles.listHeader}>Valitse reseptit</TextThemed>
      <FlatList
        style={styles.recipeList}
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selectedRecipes.includes(item.id);
          return (
            <TouchableOpacity
              style={[
                styles.recipeItem,
                isSelected && styles.selectedRecipe,
              ]}
              onPress={() => toggleRecipeSelection(item.id)}
            >
              <TextThemed style={textStyles.bodyLarge}>{item.name}</TextThemed>
            </TouchableOpacity>
          );
        }}
      />
      <ButtonComponent content="Luo kokoelma" onPress={onCreate} type="default" />
    </BaseModal>
  );
}
