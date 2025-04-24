// Recipes.jsx

import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Text,
  ActivityIndicator,
} from "react-native";
import { ref, push, onValue, remove, update } from "firebase/database";
import { getDatabase } from "firebase/database";
import useCurrentUser from "../configuration/useCurrentUser";
import TextThemed from "../components/TextThemed";
import RecipeCard from "../components/recipes/RecipeCard";
import RecipeForm from "../components/recipes/RecipeForm";
import RecipeDetailModal from "../components/recipes/RecipeDetailModal";
import RecipeCollection from "./RecipeCollection";
import TabComponent from "../components/TabComponent";
import InputFieldComponent from "../components/InputFieldComponent";
import IconButton from "../components/IconButton";
import styles from "../styles/recipesStyles";

export default function Recipes() {
  const database = getDatabase();
  const { userId, loading: authLoading } = useCurrentUser();

  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isRecipeDetailVisible, setIsRecipeDetailVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipe, setRecipe] = useState({
    id: "",
    name: "",
    servingSize: "",
    ingredients: [],
    instructions: [],
    image: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState(0);
  const [ingredientUnit, setIngredientUnit] = useState("kg");
  const [instructionStep, setInstructionStep] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("reseptit");
  const [originalRecipe, setOriginalRecipe] = useState(null);
  const [servingSize, setServingSize] = useState(1);

  useEffect(() => {
    if (!userId) return;

    const recipesRef = ref(database, `users/${userId}/recipes`);
    const unsubscribe = onValue(recipesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loaded = Object.entries(data).map(([key, val]) => ({
        id: key,
        ...val,
      }));
      setSavedRecipes(loaded);
    });

    return () => unsubscribe();
  }, [database, userId]);

  if (authLoading) {
    return (
      <View style={styles.containerCentered}>
        <ActivityIndicator size="large" />
        <TextThemed>Ladataan reseptejä…</TextThemed>
      </View>
    );
  }

  const resetForm = () => {
    setRecipe({
      id: "",
      name: "",
      ingredients: [],
      instructions: [],
      image: "",
    });
    setIngredientName("");
    setIngredientQuantity(0);
    setInstructionStep("");
    setCurrentStep(1);
    setServingSize(1);
  };

  const handleAddIngredient = () => {
    if (!ingredientName || ingredientQuantity <= 0) {
      Alert.alert("Täytä kaikki ainesosan kentät!");
      return;
    }
    setRecipe((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        {
          name: ingredientName,
          quantity: ingredientQuantity.toString(),
          unit: ingredientUnit,
        },
      ],
    }));
    setIngredientName("");
    setIngredientQuantity(0);
  };

  const handleAddInstruction = () => {
    if (!instructionStep) {
      Alert.alert("Lisää ohje!");
      return;
    }
    setRecipe((prev) => ({
      ...prev,
      instructions: [...prev.instructions, instructionStep],
    }));
    setInstructionStep("");
  };

  const handleAddRecipe = async () => {
    if (!recipe.name || recipe.ingredients.length === 0) {
      Alert.alert("Lisää reseptin nimi ja vähintään yksi ainesosa!");
      return;
    }
    try {
      const newRef = push(ref(database, `users/${userId}/recipes`));
      await update(ref(database, `users/${userId}/recipes/${newRef.key}`), {
        ...recipe,
        id: newRef.key,
        ...recipe,
        servingSize: servingSize.toString(),
      });
      resetForm();
      setIsAddModalVisible(false);
    } catch (err) {
      Alert.alert("Virhe tallennettaessa", err.message);
    }
  };

  const handleDeleteRecipe = (id) => {
    if (!id) return;
    Alert.alert(
      "Vahvista poisto",
      "Haluatko varmasti poistaa tämän reseptin?",
      [
        { text: "Peruuta", style: "cancel" },
        {
          text: "Poista",
          style: "destructive",
          onPress: async () => {
            try {
              await remove(ref(database, `users/${userId}/recipes/${id}`));
              setSavedRecipes((prev) => prev.filter((r) => r.id !== id));
              setIsRecipeDetailVisible(false);
            } catch (err) {
              Alert.alert("Virhe", err.message);
            }
          },
        },
      ]
    );
  };

  const handleChangeServings = async (newSize) => {
    if (!selectedRecipe?.id) return;
    const oldSize = parseInt(selectedRecipe.servingSize, 10);
    if (isNaN(oldSize) || oldSize <= 0) return;

    if (!Number.isInteger(newSize) || newSize <= 0) {
      Alert.alert("Annoskoon tulee olla positiivinen kokonaisluku.");
      return;
    }
    const multiplier = newSize / oldSize;

    const updatedIngredients = selectedRecipe.ingredients.map((ing) => {
      const qty = parseFloat(ing.quantity) || 0;
      return {
        ...ing,
        quantity: (qty * multiplier).toFixed(2),
      };
    });
    const updated = {
      ...selectedRecipe,
      servingSize: newSize.toString(),
      ingredients: updatedIngredients,
    };

    setSelectedRecipe(updated);
    try {
      await update(
        ref(database, `users/${userId}/recipes/${selectedRecipe.id}`),
        updated
      );
    } catch (err) {
      Alert.alert("Tallennus epäonnistui", err.message);
    }
  };

  const confirmClose = () => {
    if (JSON.stringify(recipe) !== JSON.stringify(originalRecipe)) {
      Alert.alert("Varoitus", "Haluatko poistua tallentamatta muutokset?", [
        { text: "Peruuta", style: "cancel" },
        {
          text: "Sulje tallentamatta",
          style: "destructive",
          onPress: () => {
            resetForm();
          },
        },
      ]);
    } else {
      resetForm();
    }
  };

  const openEditModal = (item) => {
    setOriginalRecipe({ ...item });
    setRecipe(item);
  };

  const unitSettings = {
    kg: { min: 0, max: 5, step: 0.1 },
    g: { min: 0, max: 1000, step: 50 },
    l: { min: 0, max: 5, step: 0.1 },
    ml: { min: 0, max: 1000, step: 50 },
    kpl: { min: 0, max: 20, step: 1 },
  };

  return (
    <View style={styles.container}>
      <TabComponent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openTab="reseptit"
        closedTab="kokoelmat"
        openTabOnPress={() => setActiveTab("reseptit")}
        closedTabOnPress={() => setActiveTab("kokoelmat")}
        openedTabType={activeTab === "reseptit" ? "tabOpen" : "tabClosed"}
        closedTabType={activeTab === "kokoelmat" ? "tabOpen" : "tabClosed"}
      />

      {activeTab === "reseptit" ? (
        <>
          <View style={styles.circleButtonContainer}>
            <IconButton
              onPress={() => {
                setIsAddModalVisible(true);
                resetForm();
              }}
            />
            <IconButton
              onPress={() => setIsSearchActive((p) => !p)}
              iconType="search"
            />
          </View>

          {isSearchActive && (
            <InputFieldComponent
              header="Hae reseptejä"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          )}

          <TextThemed style={styles.header}>Tallennetut Reseptit</TextThemed>

          <FlatList
            data={savedRecipes.filter((r) =>
              r.name.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RecipeCard
                onDelete={() => handleDeleteRecipe(item.id)}
                recipe={item}
                onPress={() => {
                  setSelectedRecipe(item);
                  setRecipe(item);
                  setIsRecipeDetailVisible(true);
                }}
              />
            )}
            ListEmptyComponent={
              <TextThemed style={styles.emptyText}>
                Ei tallennettuja reseptejä
              </TextThemed>
            }
          />

          <RecipeForm
            visible={isAddModalVisible}
            recipe={recipe}
            setRecipe={setRecipe}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            ingredientName={ingredientName}
            setIngredientName={setIngredientName}
            ingredientQuantity={ingredientQuantity}
            setIngredientQuantity={setIngredientQuantity}
            ingredientUnit={ingredientUnit}
            setIngredientUnit={setIngredientUnit}
            instructionStep={instructionStep}
            setInstructionStep={setInstructionStep}
            handleAddIngredient={handleAddIngredient}
            handleAddInstruction={handleAddInstruction}
            handleAddRecipe={handleAddRecipe}
            resetForm={resetForm}
            onClose={() => setIsAddModalVisible(false)}
            unitSettings={unitSettings}
            servingSize={servingSize}
            setServingSize={setServingSize}
          />

          <RecipeDetailModal
            visible={isRecipeDetailVisible}
            recipe={selectedRecipe}
            onClose={() => setIsRecipeDetailVisible(false)}
            onEdit={() => openEditModal(selectedRecipe)}
            onChangeServings={handleChangeServings}
          />
        </>
      ) : (
        <RecipeCollection recipes={savedRecipes} />
      )}
    </View>
  );
}
