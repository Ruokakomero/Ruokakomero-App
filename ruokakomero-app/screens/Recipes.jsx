// Recipes.jsx

import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextThemed from "../components/TextThemed";
import RecipeCard from "../components/recipes/RecipeCard";
import RecipeForm from "../components/recipes/RecipeForm";
import RecipeEditForm from "../components/recipes/RecipeEditForm";
import RecipeDetailModal from "../components/recipes/RecipeDetailModal";
import RecipeCollection from "./RecipeCollection";
import { database } from "../configuration/firebaseConfig";
import { ref, push, onValue, remove, update } from "firebase/database";
import styles from "../styles/recipesStyles";
import componentStyles from "../styles/componentStyles";
import TabComponent from "../components/TabComponent";
import InputFieldComponent from "../components/InputFieldComponent";
import IconButton from "../components/IconButton";

// Alustavat tilat ja funktiot
export default function Recipes() {
  const [recipe, setRecipe] = useState({
    id: "",
    name: "",
    ingredients: [],
    instructions: [],
    image: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState(0);
  const [ingredientUnit, setIngredientUnit] = useState("kg");
  const [instructionStep, setInstructionStep] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isRecipeDetailVisible, setIsRecipeDetailVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("reseptit");
  const [originalRecipe, setOriginalRecipe] = useState(null);

  // Firebase-haun asetus
  useEffect(() => {
    const recipeRef = ref(database, "recipes/");
    onValue(recipeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedRecipes = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setSavedRecipes(loadedRecipes);
      } else {
        setSavedRecipes([]);
      }
    });
  }, []);

  // Palauttaa lomakkeen alkutilanteeseen
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
  };

  // Lisää ainesosan reseptiin
  const handleAddIngredient = () => {
    if (!ingredientName || ingredientQuantity <= 0) {
      alert("Täytä kaikki ainesosan kentät!");
      return;
    }
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [
        ...prevRecipe.ingredients,
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

  // Lisää ohjeen reseptiin
  const handleAddInstruction = () => {
    if (!instructionStep) {
      alert("Lisää ohje!");
      return;
    }
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: [...prevRecipe.instructions, instructionStep],
    }));
    setInstructionStep("");
  };

  // Tallentaa reseptin Firebaseen
  const handleAddRecipe = async () => {
    if (!recipe.name || recipe.ingredients.length === 0) {
      alert("Lisää reseptin nimi ja vähintään yksi ainesosa!");
      return;
    }
    try {
      const newRecipeRef = push(ref(database, "recipes/"));
      const newRecipeKey = newRecipeRef.key;
      const newRecipe = { ...recipe, id: newRecipeKey };

      await update(ref(database, `recipes/${newRecipeKey}`), newRecipe);
      resetForm();
      setIsAddModalVisible(false);
    } catch (error) {
      alert(error.message);
    }
  };

  // Poistaa reseptin Firebaseestä
  const handleDeleteRecipe = (id) => {
    Alert.alert(
      "Vahvista poisto",
      "Haluatko varmasti poistaa tämän reseptin?",
      [
        {
          text: "Peruuta",
          style: "cancel",
        },
        {
          text: "Poista",
          style: "destructive",
          onPress: async () => {
            try {
              await remove(ref(database, `recipes/${id}`));
              setSavedRecipes((prev) => prev.filter((rec) => rec.id !== id));
              // Suljetaan reseptin modal, jos se on auki
              setIsRecipeDetailVisible(false);
            } catch (error) {
              Alert.alert("Virhe", error.message);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Muokkaa reseptiä Firebaseen
  const handleEditRecipe = async () => {
    if (!recipe.id) {
      alert("Reseptiä ei voi muokata ilman ID:tä!");
      return;
    }
    try {
      const updatedRecipe = {
        ...recipe,
        ingredients: recipe.ingredients ? recipe.ingredients : [],
        instructions: recipe.instructions ? recipe.instructions : [],
      };

      await update(ref(database, `recipes/${recipe.id}`), updatedRecipe);
      setSavedRecipes((prev) =>
        prev.map((rec) => (rec.id === recipe.id ? updatedRecipe : rec))
      );
      resetForm();
      setIsEditModalVisible(false);
      alert("Resepti päivitettiin onnistuneesti!");
    } catch (error) {
      alert("Muokkaus epäonnistui!");
    }
  };

  // Tarkistaa, onko muutoksia tehty muokkausmodalissa
  const confirmClose = () => {
    if (JSON.stringify(recipe) !== JSON.stringify(originalRecipe)) {
      Alert.alert(
        "Varoitus",
        "Haluatko poistua tallentamatta muutokset?",
        [
          { text: "Peruuta", style: "cancel" },
          {
            text: "Sulje tallentamatta",
            style: "destructive",
            onPress: () => {
              setIsEditModalVisible(false);
              resetForm();
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      setIsEditModalVisible(false);
      resetForm();
    }
  };

  // Avaa muokkausmodalin täyttämällä alkuperäisillä tiedoilla
  const openEditModal = (selected) => {
    setOriginalRecipe({ ...selected });
    setRecipe(selected);
    setIsEditModalVisible(true);
  };

  // Yksikköasetukset sliderille ja pickerille
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
              onPress={() => setIsSearchActive((prev) => !prev)}
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
            data={savedRecipes.filter((rec) =>
              rec.name.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RecipeCard
                onDelete={handleDeleteRecipe}
                recipe={item}
                onPress={() => {
                  setRecipe(item);
                  setSelectedRecipe(item);
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
            instructionStep={instructionStep}
            setInstructionStep={setInstructionStep}
            handleAddIngredient={handleAddIngredient}
            handleAddInstruction={handleAddInstruction}
            handleAddRecipe={handleAddRecipe}
            resetForm={resetForm}
            onClose={() => setIsAddModalVisible(false)}
            unitSettings={unitSettings}
          />

          <RecipeEditForm
            visible={isEditModalVisible}
            recipe={recipe}
            setRecipe={setRecipe}
            ingredientName={ingredientName}
            setIngredientName={setIngredientName}
            instructionStep={instructionStep}
            setInstructionStep={setInstructionStep}
            handleEditRecipe={handleEditRecipe}
            confirmClose={confirmClose}
            onClose={() => setIsEditModalVisible(false)}
          />

          <RecipeDetailModal
            visible={isRecipeDetailVisible}
            recipe={selectedRecipe}
            onClose={() => setIsRecipeDetailVisible(false)}
            onEdit={() => {
              setIsRecipeDetailVisible(false);
              openEditModal(selectedRecipe);
            }}
          />
        </>
      ) : (
        <RecipeCollection recipes={savedRecipes} />
      )}
    </View>
  );
}
