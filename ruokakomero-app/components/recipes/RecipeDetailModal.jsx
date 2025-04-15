// Tämä komponentti siirrettiin Recipes.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)

import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import TextThemed from "../../components/TextThemed";
import ButtonComponent from "../../components/ButtonComponent";
import TabComponent from "../TabComponent";
import styles from "../../styles/recipesStyles";
import textStyles from "../../styles/textStyles";
import componentStyles from "../../styles/componentStyles";

const RecipeDetailModal = ({ visible, recipe, onClose, onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState("ainesosat");

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.modalContentRecipe}>
          <ScrollView>
            <TabComponent
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              openTab="Ainesosat"
              closedTab="Ohjeet"
              openTabOnPress={() => setActiveTab("ainesosat")}
              closedTabOnPress={() => setActiveTab("ohjeet")}
              openedTabType={
                activeTab === "ainesosat" ? "tabOpen" : "tabClosed"
              }
              closedTabType={activeTab === "ohjeet" ? "tabOpen" : "tabClosed"}
            />
            <TextThemed style={textStyles.recipeTitle}>
              {recipe?.name}
            </TextThemed>
            {activeTab === "ainesosat" && (
              <>
                <TextThemed style={textStyles.listHeader}>Ainesosat</TextThemed>
                {recipe?.ingredients.map((ing, idx) => (
                  <TextThemed key={idx} style={textStyles.ingredientText}>
                    {`${ing.name}: ${ing.quantity} ${ing.unit}`}
                  </TextThemed>
                ))}
              </>
            )}
            {activeTab === "ohjeet" && (
              <>
                <TextThemed style={textStyles.listHeader}>Ohjeet</TextThemed>
                {recipe?.instructions.map((step, idx) => (
                  <TextThemed key={idx} style={textStyles.listItemText}>
                    {`${idx + 1}. ${step}`}
                  </TextThemed>
                ))}
              </>
            )}
            <View style={componentStyles.buttonWrapper}>
              <ButtonComponent
                content="Poista"
                onPress={() => onDelete(recipe?.id)}
                type="danger"
              />
              <ButtonComponent content="Muokkaa" type="edit" onPress={onEdit} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default RecipeDetailModal;
