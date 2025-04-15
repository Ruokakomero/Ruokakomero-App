import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";

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

export default function RecipeCollection({ recipes = [] }) {
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
  const [addRecipeModalVisible, setAddRecipeModalVisible] = useState(false);

  
  const fetchRecipeDetails = async (collectionsData) => {
    let recipeData = { ...recipeDetails };

    for (const collection of collectionsData) {
      for (const recipeId of collection.recipes) {
        if (!recipeData[recipeId]) {
          const recipeRef = ref(database, `recipes/${recipeId}`);
          const recipeSnapshot = await get(recipeRef);
          if (recipeSnapshot.exists()) {
            recipeData[recipeId] = recipeSnapshot.val().name;
          }
        }
      }
    }
    setRecipeDetails(recipeData);
  };

  const createCollection = async () => {
    if (!collectionName.trim()) {
      Alert.alert("Virhe", "Anna kokoelmalle nimi!");
      return;
    }
    try {
      const newCollectionRef = push(ref(database, "recipeCollections/"));
      const newCollectionKey = newCollectionRef.key;

      const newCollection = {
        id: newCollectionKey,
        name: collectionName,
        recipes: selectedRecipesForNewCollection,
      };

      await update(
        ref(database, `recipeCollections/${newCollectionKey}`),
        newCollection
      );

      setCollectionName("");
      setSelectedRecipesForNewCollection([]);
      setIsCreateModalVisible(false);
      Alert.alert("Kokoelma luotu", "Kokoelma on luotu onnistuneesti!");
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
      const collectionRef = ref(
        database,
        `recipeCollections/${selectedCollectionId}`
      );
      const collectionSnapshot = await get(collectionRef);

      if (collectionSnapshot.exists()) {
        const collection = collectionSnapshot.val();
        const updatedRecipes = collection.recipes
          ? [...collection.recipes, recipeId]
          : [recipeId];

        await update(collectionRef, { recipes: updatedRecipes });

        setAddRecipeModalVisible(false);
      }
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };

  const removeRecipeFromCollection = async (collectionId, recipeId) => {
    try {
      const collectionRef = ref(database, `recipeCollections/${collectionId}`);
      const collectionSnapshot = await get(collectionRef);

      if (collectionSnapshot.exists()) {
        const collection = collectionSnapshot.val();
        const currentRecipes = collection.recipes || [];
        const updatedRecipes = currentRecipes.filter((id) => id !== recipeId);

        await update(collectionRef, { recipes: updatedRecipes });

        setRecipeDetails((prevDetails) => {
          const updatedDetails = { ...prevDetails };
          delete updatedDetails[recipeId];
          return updatedDetails;
        });
      }
    } catch (error) {
      console.error("Error removing recipe: ", error);
    }
  };

  const deleteCollection = async (collectionId) => {
    try {
      await remove(ref(database, `recipeCollections/${collectionId}`));
    } catch (error) {
      console.error("Error deleting collection: ", error);
    }
  };

  const openAddRecipeModal = (collectionId) => {
    setSelectedCollectionId(collectionId);
    setAddRecipeModalVisible(true);
  };

  const updateCollection = async () => {
    if (!collectionToEdit || !editedCollectionName.trim()) {
      Alert.alert("Virhe", "Anna kokoelman nimi!");
      return;
    }
    try {
      const collectionRef = ref(
        database,
        `recipeCollections/${collectionToEdit.id}`
      );
      await update(collectionRef, { name: editedCollectionName });
      setIsEditCollectionModalVisible(false);
      setCollectionToEdit(null);
      setEditedCollectionName("");
    } catch (error) {
      console.error("Error updating collection:", error);
      Alert.alert("Virhe", "Kokoelman päivitys epäonnistui!");
    }
  };

  useEffect(() => {
    const collectionRef = ref(database, "recipeCollections/");
    onValue(collectionRef, async (snapshot) => {
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
  }, []);

  return (
    <View style={styles.container}>
      <IconButton
        onPress={() => setIsCreateModalVisible(true)}
        iconType="add-circle"
      />

      <CreateCollectionModal
        visible={isCreateModalVisible}
        collectionName={collectionName}
        setCollectionName={setCollectionName}
        recipes={recipes}
        selectedRecipes={selectedRecipesForNewCollection}
        toggleRecipeSelection={(id) => {
        }}
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
            onToggleMenu={(id) =>
              setMenuVisible((prev) => (prev === id ? null : id))
            }
            isMenuVisible={menuVisible === item.id}
            onEdit={(coll) => {
              setCollectionToEdit(coll);
              setEditedCollectionName(coll.name);
              setIsEditCollectionModalVisible(true);
            }}
            onDelete={deleteCollection}
            onRemoveRecipe={removeRecipeFromCollection}
            onOpenAddRecipe={(collId) => {
              openAddRecipeModal(collId);
              setSelectedCollectionId(collId);
              setIsAddRecipeModalVisible(true);
            }}
          />
        )}
      />

      <AddRecipeModal
        visible={isAddRecipeModalVisible}
        availableRecipes={fetchRecipeDetails}
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
          onAddRecipe={(collId) => {
            setSelectedCollectionId(collId);
            setIsAddRecipeModalVisible(true);
          }}
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
