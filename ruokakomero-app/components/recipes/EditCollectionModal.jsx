// components/recipes/EditCollectionModal.jsx
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import TextThemed from "../../components/TextThemed";
import InputFieldComponent from "../../components/InputFieldComponent";
import ButtonComponent from "../../components/ButtonComponent";
import BaseModal from "../../components/BaseModal";
import styles from "../../styles/recipesStyles";
import textStyles from "../../styles/textStyles";

export default function EditCollectionModal({
  visible,
  collection,
  editedName,
  setEditedName,
  recipeDetails,
  onUpdate,
  onAddRecipe,
  onClose,
  onRemoveRecipe,
}) {
  return (
    <BaseModal visible={visible} title="Muokkaa Kokoelmaa" onClose={onClose}>
      <InputFieldComponent
        placeholder="Kokoelman nimi"
        header="Kokoelman nimi"
        value={editedName}
        onChangeText={setEditedName}
      />
      <TextThemed style={textStyles.listHeader}>Reseptit kokoelmassa:</TextThemed>
      <FlatList
        data={collection.recipes || []}
        keyExtractor={(recipeId) => recipeId}
        renderItem={({ item: recipeId }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 4 }}>
            <TextThemed style={textStyles.bodyLarge}>
              {recipeDetails[recipeId] || "Ladataan..."}
            </TextThemed>
            <TouchableOpacity onPress={() => onRemoveRecipe(collection.id, recipeId)}>
              <TextThemed style={{ color: "red", fontSize: 14 }}>Poista</TextThemed>
            </TouchableOpacity>
          </View>
        )}
      />
      <ButtonComponent
        content="Lisää resepti"
        onPress={() => onAddRecipe(collection.id)}
        type="default"
      />
      <ButtonComponent content="Tallenna muutokset" onPress={onUpdate} type="default" />
    </BaseModal>
  );
}
