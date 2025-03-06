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
import { database } from "../constants/firebaseConfig"; // ✅ Ensure this is from Realtime Database
import { ref, push, onValue, remove, update, get } from "firebase/database";

export default function RecipeCollection({ recipes = [] }) {
  const [collectionName, setCollectionName] = useState("");
  const [collections, setCollections] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [addRecipeModalVisible, setAddRecipeModalVisible] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState({}); // ✅ Stores fetched recipe names

  /** 🔹 Fetch collections from Firebase */
  

  /** 🔹 Fetch the recipe names for stored recipe IDs */
  const fetchRecipeDetails = async (collections) => {
    let recipeData = { ...recipeDetails };

    for (const collection of collections) {
      for (const recipeId of collection.recipes) {
        if (!recipeData[recipeId]) {
          const recipeRef = ref(database, `recipes/${recipeId}`);
          const recipeSnapshot = await get(recipeRef);
          if (recipeSnapshot.exists()) {
            recipeData[recipeId] = recipeSnapshot.val().name; // ✅ Store only name
          }
        }
      }
    }
    setRecipeDetails(recipeData);
  };

  /** 🔹 Add a recipe to a collection */
  const addRecipeToCollection = async (recipeId) => {
    if (!selectedCollectionId) {
      Alert.alert("Virhe", "Valitse kokoelma ensin!");
      return;
    }

    try {
      const collectionRef = ref(database, `recipeCollections/${selectedCollectionId}`);
      const collectionSnapshot = await get(collectionRef);

      if (collectionSnapshot.exists()) {
        const collection = collectionSnapshot.val();
        const updatedRecipes = collection.recipes ? [...collection.recipes, recipeId] : [recipeId];

        await update(collectionRef, { recipes: updatedRecipes });

        setAddRecipeModalVisible(false);
        Alert.alert("Resepti lisätty", "Resepti lisättiin kokoelmaan onnistuneesti.");
      }
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };

  /** 🔹 Remove a recipe from a collection */
  const removeRecipeFromCollection = async (collectionId, recipeId) => {
    try {
      const collectionRef = ref(database, `recipeCollections/${collectionId}`);
      const collectionSnapshot = await get(collectionRef);

      if (collectionSnapshot.exists()) {
        const collection = collectionSnapshot.val();
        const updatedRecipes = collection.recipes.filter((id) => id !== recipeId);

        await update(collectionRef, { recipes: updatedRecipes });

        // Update state
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

  /** 🔹 Delete an entire collection */
  const deleteCollection = async (collectionId) => {
    try {
      await remove(ref(database, `recipeCollections/${collectionId}`));
    } catch (error) {
      console.error("Error deleting collection: ", error);
    }
  };

  /** 🔹 Open add recipe modal */
  const openAddRecipeModal = (collectionId) => {
    setSelectedCollectionId(collectionId);
    setAddRecipeModalVisible(true);
  };

  useEffect(() => {
    const collectionRef = ref(database, "recipeCollections/");
    onValue(collectionRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedCollections = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setCollections(loadedCollections);
        await fetchRecipeDetails(loadedCollections); // ✅ Fetch recipe names
      } else {
        setCollections([]);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.plusButton}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.modalContent}>
          <Text style={styles.header}>Luo Kokoelma</Text>
          <TextInput
            style={styles.input}
            placeholder="Kokoelman nimi"
            value={collectionName}
            onChangeText={setCollectionName}
          />
          <Button title="Luo" onPress={createCollection} />
        </View>
      )}

      <FlatList
        data={collections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.collectionItem}>
            <TouchableOpacity onPress={() => setMenuVisible(menuVisible === item.id ? null : item.id)}>
              <Text style={styles.collectionName}>{item.name}</Text>
            </TouchableOpacity>

            {menuVisible === item.id && (
              <View style={styles.menuOptions}>
                <Button title="Poista" color="red" onPress={() => deleteCollection(item.id)} />
              </View>
            )}

            <FlatList
              data={item.recipes}
              keyExtractor={(recipeId) => recipeId}
              renderItem={({ item: recipeId }) => (
                <View style={styles.recipeItem}>
                  <Text style={styles.recipeName}>{recipeDetails[recipeId] || "Ladataan..."}</Text>
                  <TouchableOpacity onPress={() => removeRecipeFromCollection(item.id, recipeId)}>
                    <Text style={styles.deleteText}>Poista</Text>
                  </TouchableOpacity>
                </View>
              )}
              ListFooterComponent={
                <TouchableOpacity style={styles.addRecipeButton} onPress={() => openAddRecipeModal(item.id)}>
                  <Ionicons name="add-circle" size={24} color="green" />
                  <Text style={styles.addRecipeText}>Lisää resepti</Text>
                </TouchableOpacity>
              }
            />
          </View>
        )}
      />

      {/* 🔹 Modal for adding a recipe */}
      <Modal visible={addRecipeModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.header}>Valitse resepti lisättäväksi</Text>
            <FlatList
              data={recipes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.recipeList} onPress={() => addRecipeToCollection(item.id)}>
                  <Text style={styles.recipeName}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Sulje" color="red" onPress={() => setAddRecipeModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  collectionName: { fontSize: 16, fontWeight: "bold" },
  recipeItem: {
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
  recipeList: {
    marginBottom: 20,
    marginTop: 10,
    padding: 15,
  },
  recipeName: { fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,

   },

  header: { fontSize: 20, marginBottom: 10 },

});
