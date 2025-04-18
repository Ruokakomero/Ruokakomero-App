// RecipesCollection.jsx
import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextThemed from "../components/TextThemed";
import RecipeCard from "../components/recipes/RecipeCard";
import CreateCollectionModal from "../components/recipes/CreateCollectionModal";
import EditCollectionModal from "../components/recipes/EditCollectionModal";
import AddRecipeModal from "../components/recipes/AddRecipeModal";
import CollectionItem from "../components/recipes/CollectionItem";
import { database } from "../configuration/firebaseConfig";
import { ref, push, onValue, remove, update, get } from "firebase/database";
import styles from "../styles/recipesStyles";
import componentStyles from "../styles/componentStyles";
import textStyles from "../styles/textStyles";
import IconButton from "../components/IconButton";

export default function RecipesCollection({ recipes = [] }) {
  const [collectionName, setCollectionName] = useState("");
  const [selectedRecipesForNewCollection, setSelectedRecipesForNewCollection] =
    useState([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditCollectionModalVisible, setIsEditCollectionModalVisible] =
    useState(false);
  const [collectionToEdit, setCollectionToEdit] = useState(null);
  const [editedCollectionName, setEditedCollectionName] = useState("");
  const [isAddRecipeModalVisible, setIsAddRecipeModalVisible] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [collections, setCollections] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [menuVisible, setMenuVisible] = useState(null);

  const fetchRecipeDetails = async (collectionsData) => {
    let details = { ...recipeDetails };
    for (const coll of collectionsData) {
      for (const recipeId of coll.recipes) {
        if (!details[recipeId]) {
          const rRef = ref(database, `recipes/${recipeId}`);
          const snapshot = await get(rRef);
          if (snapshot.exists()) {
            details[recipeId] = snapshot.val().name;
          }
        }
      }
    }
    setRecipeDetails(details);
  };

  const createCollection = async () => {
    if (!collectionName.trim()) {
      Alert.alert("Virhe", "Anna kokoelmalle nimi!");
      return;
    }
    try {
      const newCollRef = push(ref(database, "recipeCollections/"));
      const newKey = newCollRef.key;
      const newCollection = {
        id: newKey,
        name: collectionName,
        recipes: selectedRecipesForNewCollection,
      };
      await update(ref(database, `recipeCollections/${newKey}`), newCollection);
      setCollectionName("");
      setSelectedRecipesForNewCollection([]);
      setIsCreateModalVisible(false);
    } catch (error) {
      console.error("Error creating collection:", error);
      Alert.alert("Virhe", "Kokoelman luonti epäonnistui!");
    }
  };

  const addRecipeToCollection = async (recipeId) => {
    if (!selectedCollectionId) {
      Alert.alert("Virhe", "Valitse kokoelma ensin!");
      return;
    }
    try {
      const collRef = ref(
        database,
        `recipeCollections/${selectedCollectionId}`
      );
      const snapshot = await get(collRef);
      if (snapshot.exists()) {
        const coll = snapshot.val();
        const updatedRecipes = coll.recipes
          ? [...coll.recipes, recipeId]
          : [recipeId];
        await update(collRef, { recipes: updatedRecipes });
        setIsAddRecipeModalVisible(false);
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const removeRecipeFromCollection = async (collectionId, recipeId) => {
    try {
      const collRef = ref(database, `recipeCollections/${collectionId}`);
      const snapshot = await get(collRef);
      if (snapshot.exists()) {
        const coll = snapshot.val();
        const updatedRecipes = (coll.recipes || []).filter(
          (id) => id !== recipeId
        );
        await update(collRef, { recipes: updatedRecipes });
        setRecipeDetails((prev) => {
          const copy = { ...prev };
          delete copy[recipeId];
          return copy;
        });
      }
    } catch (error) {
      console.error("Error removing recipe:", error);
    }
  };

  const deleteCollection = async (collectionId) => {
    try {
      await remove(ref(database, `recipeCollections/${collectionId}`));
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  const openAddRecipeModal = (collectionId) => {
    setSelectedCollectionId(collectionId);
    setIsAddRecipeModalVisible(true);
  };

  const confirmClose = () => {
    Alert.alert(
      "Varoitus",
      "Haluatko poistaa kokoelman?",
      [
        { text: "Peruuta", style: "cancel" },
        {
          text: "Kyllä",
          style: "destructive",
          onPress: () => deleteCollection(collectionToEdit.id),
        },
      ], { cancelable: true }

    );

  }

  const updateCollection = async () => {
    if (!collectionToEdit || !editedCollectionName.trim()) {
      Alert.alert("Virhe", "Anna kokoelman nimi!");
      return;
    }
    try {
      const collRef = ref(database, `recipeCollections/${collectionToEdit.id}`);
      await update(collRef, { name: editedCollectionName });
      setIsEditCollectionModalVisible(false);
      setCollectionToEdit(null);
      setEditedCollectionName("");
    } catch (error) {
      console.error("Error updating collection:", error);
      Alert.alert("Virhe", "Kokoelman päivitys epäonnistui!");
    }
  };

  const toggleMenu = (collectionId) => {
    setMenuVisible((prev) => (prev === collectionId ? null : collectionId));
  };

  const toggleRecipeSelection = (recipeId) => {
    const isSelected = selectedRecipesForNewCollection.includes(recipeId);
    if (isSelected) {
      setSelectedRecipesForNewCollection((prev) =>
        prev.filter((id) => id !== recipeId)
      );
    } else {
      setSelectedRecipesForNewCollection((prev) => [...prev, recipeId]);
    }
  };

  useEffect(() => {
    const collRef = ref(database, "recipeCollections/");
    const unsubscribe = onValue(collRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedCollections = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
          recipes: data[key].recipes || [],
        }));
        setCollections(loadedCollections);
        await fetchRecipeDetails(loadedCollections);
      } else {
        setCollections([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const availableRecipesForCollection = () => {
    const current = collections.find((c) => c.id === selectedCollectionId);
    if (current) {
      return recipes.filter((r) => !(current.recipes || []).includes(r.id));
    }
    return recipes;
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleButtonContainer}>
        <IconButton
          onPress={() => setIsCreateModalVisible(true)}
          iconType="add-circle"
        />
      </View>

      <CreateCollectionModal
        visible={isCreateModalVisible}
        collectionName={collectionName}
        setCollectionName={setCollectionName}
        recipes={recipes}
        selectedRecipes={selectedRecipesForNewCollection}
        toggleRecipeSelection={toggleRecipeSelection}
        onCreate={createCollection}
        onClose={() => {
          setIsCreateModalVisible(false);
          setCollectionName("");
          setSelectedRecipesForNewCollection([]);
        }}
      />
      <FlatList
        data={collections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CollectionItem
            collection={item}
            recipeDetails={recipeDetails}
            onToggleMenu={toggleMenu}
            isMenuVisible={menuVisible === item.id}
            onEdit={(coll) => {
              setCollectionToEdit(coll);
              setEditedCollectionName(coll.name);
              setIsEditCollectionModalVisible(true);
            }}
            onDelete={deleteCollection}
            onRemoveRecipe={removeRecipeFromCollection}
            onOpenAddRecipe={(collId) => openAddRecipeModal(collId)}
          />
        )}
      />
      <AddRecipeModal
        visible={isAddRecipeModalVisible}
        availableRecipes={availableRecipesForCollection()}
        onAddRecipe={addRecipeToCollection}
        onClose={() => setIsAddRecipeModalVisible(false)}
      />
      {isEditCollectionModalVisible && collectionToEdit && (
        <EditCollectionModal
          visible={isEditCollectionModalVisible}
          collection={collectionToEdit}
          editedName={editedCollectionName}
          setEditedName={setEditedCollectionName}
          recipeDetails={recipeDetails}
          onUpdate={updateCollection}
          onAddRecipe={(collId) => openAddRecipeModal(collId)}
          onClose={() => {
            setIsEditCollectionModalVisible(false);
            setCollectionToEdit(null);
            setEditedCollectionName("");
          }}
          onRemoveRecipe={removeRecipeFromCollection}
        />
      )}
    </View>
  );
}
