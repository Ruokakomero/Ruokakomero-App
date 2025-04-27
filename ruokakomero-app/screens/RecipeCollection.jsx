import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Alert, ActivityIndicator } from "react-native";
import { ref, push, onValue, remove, get, set, update } from "firebase/database";
import { database } from "../configuration/firebaseConfig";
import useCurrentUser from "../configuration/useCurrentUser";
import TextThemed from "../components/TextThemed";
import CreateCollectionModal from "../components/recipes/CreateCollectionModal";
import AddRecipeModal from "../components/recipes/AddRecipeModal";
import CollectionItem from "../components/recipes/CollectionItem";
import IconButton from "../components/IconButton";
import styles from "../styles/recipesStyles";
import screensStyles from "../styles/screensStyles";

export default function RecipesCollection({ recipes = [] }) {
  const { userId, loading: authLoading } = useCurrentUser();
  const [collections, setCollections] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [selectedRecipesForNewCollection, setSelectedRecipesForNewCollection] =
    useState([]);
  const [isAddRecipeModalVisible, setIsAddRecipeModalVisible] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [menuVisible, setMenuVisible] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const collRef = ref(database, `users/${userId}/recipeCollections`);
    const unsubscribe = onValue(collRef, async (snap) => {
      const data = snap.val() || {};
      const loaded = Object.entries(data).map(([id, val]) => ({
        id,
        name: val.name,
        recipes: val.recipes || [],
      }));
      setCollections(loaded);
      await fetchRecipeDetails(loaded);
    });

    return () => unsubscribe();
  }, [userId]);

  const fetchRecipeDetails = useCallback(
    async (collectionsData) => {
      if (!userId) return;
      const cache = { ...recipeDetails };

      for (const { recipes: recIds } of collectionsData) {
        for (const rid of recIds) {
          if (!cache[rid]) {
            const snap = await get(
              ref(database, `users/${userId}/recipes/${rid}`)
            );
            if (snap.exists()) cache[rid] = snap.val();
          }
        }
      }
      setRecipeDetails(cache);
    },
    [userId, recipeDetails]
  );

  if (authLoading) {
    return (
      <View style={styles.containerCentered}>
        <ActivityIndicator size="large" />
        <TextThemed>Ladataan kokoelmia…</TextThemed>
      </View>
    );
  }

  const createCollection = async () => {
    if (!collectionName.trim()) {
      Alert.alert("Virhe", "Anna kokoelmalle nimi!");
      return;
    }
    const basePath = `users/${userId}/recipeCollections`;
    const newRef = push(ref(database, basePath));
    const id = newRef.key;
    const coll = { id, name: collectionName, recipes: selectedRecipesForNewCollection };

    await update(ref(database, `${basePath}/${id}`), coll);
    setCollectionName("");
    setSelectedRecipesForNewCollection([]);
    setIsCreateModalVisible(false);
  };

  const addRecipeToCollection = async (recipeId) => {
    if (!selectedCollectionId) {
      Alert.alert("Virhe", "Valitse kokoelma ensin!");
      return;
    }
    const path = `users/${userId}/recipeCollections/${selectedCollectionId}`;
    const snap = await get(ref(database, path));
    if (!snap.exists()) return;

    const existing = snap.val().recipes || [];
    const updated = [...existing, recipeId];
    await set(ref(database, `${path}/recipes`), updated);

    setCollections((prev) =>
      prev.map((c) =>
        c.id === selectedCollectionId ? { ...c, recipes: updated } : c
      )
    );

    await fetchRecipeDetails([{ recipes: [recipeId] }]);
    setIsAddRecipeModalVisible(false);
  };

  const removeRecipeFromCollection = async (collectionId, recipeId) => {
    const path = `users/${userId}/recipeCollections/${collectionId}`;
    const snap = await get(ref(database, path));
    if (!snap.exists()) return;

    const existing = snap.val().recipes || [];
    const updated = existing.filter((id) => id !== recipeId);

    await set(ref(database, `${path}/recipes`), updated);

    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId ? { ...c, recipes: updated } : c
      )
    );

    setRecipeDetails((prev) => {
      const copy = { ...prev };
      delete copy[recipeId];
      return copy;
    });
  };

  const deleteCollection = async (id) => {
    await remove(ref(database, `users/${userId}/recipeCollections/${id}`));
  };

  const toggleMenu = (id) => setMenuVisible((m) => (m === id ? null : id));

  const availableRecipesForCollection = () => {
    const coll = collections.find((c) => c.id === selectedCollectionId);
    return coll
      ? recipes.filter((r) => !coll.recipes.includes(r.id))
      : recipes;
  };

  return (
    <View style={screensStyles.appContainer}>
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
        toggleRecipeSelection={(rid) =>
          setSelectedRecipesForNewCollection((prev) =>
            prev.includes(rid) ? prev.filter((x) => x !== rid) : [...prev, rid]
          )
        }
        onCreate={createCollection}
        onClose={() => setIsCreateModalVisible(false)}
      />

      <FlatList
        data={collections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CollectionItem
            collection={item}
            recipeDetails={recipeDetails}
            onToggleMenu={() => toggleMenu(item.id)}
            isMenuVisible={menuVisible === item.id}
            onDelete={() => deleteCollection(item.id)}
            onRemoveRecipe={removeRecipeFromCollection}
            onOpenAddRecipe={() => {
              setSelectedCollectionId(item.id);
              setIsAddRecipeModalVisible(true);
            }}
          />
        )}
      />

      <AddRecipeModal
        visible={isAddRecipeModalVisible}
        availableRecipes={availableRecipesForCollection()}
        onAddRecipe={addRecipeToCollection}
        onClose={() => setIsAddRecipeModalVisible(false)}
      />
    </View>
  );
}
