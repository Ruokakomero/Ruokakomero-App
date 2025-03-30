import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { database } from "../constants/firebaseConfig";
import { ref, push, onValue, remove, update, get } from "firebase/database";

export default function RecipeCollection({ recipes = [] }) {

  const [collectionName, setCollectionName] = useState("");
  const [selectedRecipesForNewCollection, setSelectedRecipesForNewCollection] =
    useState([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [collections, setCollections] = useState([]);
  const [menuVisible, setMenuVisible] = useState(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [addRecipeModalVisible, setAddRecipeModalVisible] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [isEditCollectionModalVisible, setIsEditCollectionModalVisible] =
    useState(false);
  const [collectionToEdit, setCollectionToEdit] = useState(null);
  const [editedCollectionName, setEditedCollectionName] = useState("");
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
        Alert.alert(
          "Resepti lisätty",
          "Resepti lisättiin kokoelmaan onnistuneesti."
        );
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
      Alert.alert(
        "Kokoelma päivitetty",
        "Kokoelma on päivitetty onnistuneesti!"
      );
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

      <TouchableOpacity
        onPress={() => setIsCreateModalVisible(true)}
        style={styles.plusButton}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <Modal
        visible={isCreateModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.header}>Luo Kokoelma</Text>
            <TextInput
              style={styles.input}
              placeholder="Kokoelman nimi"
              value={collectionName}
              onChangeText={setCollectionName}
            />
            <Text style={styles.subHeader}>Valitse reseptit</Text>
            <FlatList
              data={recipes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isSelected = selectedRecipesForNewCollection.includes(
                  item.id
                );
                return (
                  <TouchableOpacity
                    style={[
                      styles.recipeList,
                      isSelected && styles.selectedRecipe,
                    ]}
                    onPress={() => {
                      if (isSelected) {
                        setSelectedRecipesForNewCollection((prev) =>
                          prev.filter((id) => id !== item.id)
                        );
                      } else {
                        setSelectedRecipesForNewCollection((prev) => [
                          ...prev,
                          item.id,
                        ]);
                      }
                    }}
                  >
                    <Text style={styles.recipeName}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
            <Button title="Luo kokoelma" onPress={createCollection} />
            <Button
              title="Sulje"
              color="red"
              onPress={() => {
                setIsCreateModalVisible(false);
                setCollectionName("");
                setSelectedRecipesForNewCollection([]);
              }}
            />
          </View>
        </View>
      </Modal>


      <FlatList
        data={collections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.collectionItem}>
            <View style={styles.collectionHeader}>
              <TouchableOpacity
                onPress={() =>
                  setMenuVisible(menuVisible === item.id ? null : item.id)
                }
              >
                <Text style={styles.collectionName}>{item.name}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setCollectionToEdit(item);
                  setEditedCollectionName(item.name);
                  setIsEditCollectionModalVisible(true);
                }}
              >
                <Text style={styles.editText}>Muokkaa</Text>
              </TouchableOpacity>
            </View>

            {menuVisible === item.id && (
              <View style={styles.menuOptions}>
                <Button
                  title="Poista"
                  color="red"
                  onPress={() => deleteCollection(item.id)}
                />
              </View>
            )}

            <FlatList
              data={item.recipes}
              keyExtractor={(recipeId) => recipeId}
              renderItem={({ item: recipeId }) => (
                <View style={styles.recipeItem}>
                  <Text style={styles.recipeName}>
                    {recipeDetails[recipeId] || "Ladataan..."}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      removeRecipeFromCollection(item.id, recipeId)
                    }
                  >
                    <Text style={styles.deleteText}>Poista</Text>
                  </TouchableOpacity>
                </View>
              )}
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.addRecipeButton}
                  onPress={() => openAddRecipeModal(item.id)}
                >
                  <Ionicons name="add-circle" size={24} color="green" />
                </TouchableOpacity>
              }
            />
          </View>
        )}
      />

      <Modal
        visible={addRecipeModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.header}>Valitse resepti lisättäväksi</Text>
            {(() => {
              const currentCollection = collections.find(
                (c) => c.id === selectedCollectionId
              );
              const availableRecipes = currentCollection
                ? recipes.filter(
                    (r) => !(currentCollection.recipes || []).includes(r.id)
                  )
                : recipes;
              return (
                <FlatList
                  data={availableRecipes}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.recipeList}
                      onPress={() => addRecipeToCollection(item.id)}
                    >
                      <Text style={styles.recipeName}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              );
            })()}
            <Button
              title="Sulje"
              color="red"
              onPress={() => setAddRecipeModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      {isEditCollectionModalVisible && collectionToEdit && (
        <Modal
          visible={isEditCollectionModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.header}>Muokkaa Kokoelmaa</Text>
              <TextInput
                style={styles.input}
                value={editedCollectionName}
                onChangeText={setEditedCollectionName}
                placeholder="Kokoelman nimi"
              />
              <Text style={styles.subHeader}>Reseptit kokoelmassa:</Text>
              <FlatList
                data={collectionToEdit.recipes || []}
                keyExtractor={(recipeId) => recipeId}
                renderItem={({ item: recipeId }) => (
                  <View style={styles.recipeItem}>
                    <Text style={styles.recipeName}>
                      {recipeDetails[recipeId] || "Ladataan..."}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        removeRecipeFromCollection(
                          collectionToEdit.id,
                          recipeId
                        )
                      }
                    >
                      <Text style={styles.deleteText}>Poista</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              <Button
                title="Lisää resepti"
                onPress={() => openAddRecipeModal(collectionToEdit.id)}
              />
              <Button title="Tallenna muutokset" onPress={updateCollection} />
              <Button
                title="Sulje"
                color="red"
                onPress={() => {
                  setIsEditCollectionModalVisible(false);
                  setCollectionToEdit(null);
                  setEditedCollectionName("");
                }}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  plusButton: {
    backgroundColor: "#007BFF",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  collectionItem: {
    padding: 16,
    gap: 10,
    borderWidth: 5,
    borderColor: "#ccc",
    borderRadius: 16,
    marginVertical: 16,
  },
  collectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  collectionName: { fontSize: 24, fontWeight: "bold" },
  editText: { color: "blue", marginRight: 10 },
  menuOptions: { marginVertical: 5 },
  recipeItem: {
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  deleteText: { color: "red" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginTop: 50,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "ccc",
    padding: 10,
    marginBottom: 10,
  },
  recipeList: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
    borderRadius: 5,
  },
  selectedRecipe: {
    backgroundColor: "#d0f0c0",
  },
  recipeName: { fontSize: 14, fontWeight: "bold" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  subHeader: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
  addRecipeButton: {
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});
