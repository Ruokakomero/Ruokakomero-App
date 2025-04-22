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
import recipesStyles from "../../styles/recipesStyles";

const RecipeDetailModal = ({ visible, recipe, onClose,}) => {
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
                activeTab === "ainesosat" ? "enabled" : "disabled"
              }
              closedTabType={activeTab === "ohjeet" ? "enabled" : "disabled"}
            />
            <TextThemed style={textStyles.recipeTitle}>
              {recipe?.name}
            </TextThemed>
            {activeTab === "ainesosat" && (
              <>
                <TextThemed style={textStyles.listHeader}>Ainesosat</TextThemed>
                {recipe?.ingredients.map((ing, idx) => (
                  <View style={recipesStyles.ingredientListItem}>
                    <TextThemed key={idx} style={textStyles.ingredientText}>
                    {`${ing.quantity} ${ing.unit}`}
                    </TextThemed>
                    <TextThemed key={idx} style={textStyles.ingredientText}>
                    {`${ing.name}`}
                    </TextThemed>
                  </View>
                  
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
           
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default RecipeDetailModal;
