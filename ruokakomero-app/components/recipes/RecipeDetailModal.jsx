import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import TextThemed from "../../components/TextThemed";
import TabComponent from "../TabComponent";
import styles from "../../styles/recipesStyles";
import textStyles from "../../styles/textStyles";
import recipesStyles from "../../styles/recipesStyles";

const RecipeDetailModal = ({ visible, recipe, onClose, onChangeServings }) => {
  const [activeTab, setActiveTab] = useState("ainesosat");
  const [servings, setServings] = useState(1);

  useEffect(() => {
    const parsed = parseInt(recipe?.servingSize, 10);
    setServings(!isNaN(parsed) && parsed > 0 ? parsed : 1);
  }, [recipe?.servingSize]);

  const adjust = (delta) => {
    const next = servings + delta;
    if (next > 0) {
      setServings(next);
      onChangeServings(next);
    }
  };

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
              openedTabType={activeTab === "ainesosat" ? "enabled" : "disabled"}
              closedTabType={activeTab === "ohjeet" ? "enabled" : "disabled"}
            />

            <TextThemed style={textStyles.recipeTitle}>
              {recipe?.name}
            </TextThemed>

            {activeTab === "ainesosat" && (
              <>
                <View style={recipesStyles.servingsContainer}>
                  <TextThemed style={textStyles.bodyLargeB}>
                    Annokset:
                  </TextThemed>
                  <View style={recipesStyles.stepper}>
                    <TouchableOpacity onPress={() => adjust(-1)}>
                      <TextThemed style={recipesStyles.stepperButton}>
                        –
                      </TextThemed>
                    </TouchableOpacity>
                    <TextThemed style={recipesStyles.stepperValue}>
                      {servings}
                    </TextThemed>
                    <TouchableOpacity onPress={() => adjust(+1)}>
                      <TextThemed style={recipesStyles.stepperButton}>
                        +
                      </TextThemed>
                    </TouchableOpacity>
                  </View>
                </View>
                <TextThemed style={textStyles.listHeader}>Ainesosat</TextThemed>
                {recipe?.ingredients.map((ing, idx) => (
                  <View key={idx} style={recipesStyles.ingredientListItem}>
                    <TextThemed style={textStyles.ingredientText}>
                      {`${ing.quantity} ${ing.unit}`}
                    </TextThemed>
                    <TextThemed style={textStyles.ingredientTextName}>
                      {ing.name}
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
