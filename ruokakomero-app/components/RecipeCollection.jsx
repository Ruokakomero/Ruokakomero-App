import React, { useState } from "react";
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

export default function RecipeCollection({
  recipes = [{}],
  onAddToCollection,
}) {
  const [collectionName, setCollectionName] = useState("");

  // DEMODATAA
  const [collections, setCollections] = useState([
    {
      name: "Suosikit",
      recipes: [
        {
          id: "",
          name: "Pasta",
          ingredients: ["Spaghetti", "Tomato Sauce"],
          instructions: ["Boil pasta and add sauce."],
        },
        {
          id: "",
          name: "Pizza",
          ingredients: ["Dough", "Cheese", "Tomato Sauce"],
          instructions: ["Bake at 200°C for 15 min."],
        },
      ],
    },
    {
      name: "Nopeat Ruoat",
      recipes: [
        {
          id: "",
          name: "Salaatti",
          ingredients: ["Lettuce", "Tomato", "Cucumber"],
          instructions: ["Mix all ingredients.", "Add dressing."],
        },
      ],
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [addRecipeModalVisible, setAddRecipeModalVisible] = useState(false);
  const [selectedCollectionIndex, setSelectedCollectionIndex] = useState(null);
  const [recipeDetail, setRecipeDetail] = useState(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const createCollection = () => {
    if (collectionName.trim() !== "") {
      setCollections([...collections, { name: collectionName, recipes: [] }]);
      setCollectionName("");
      setIsOpen(false);
    } else {
      Alert.alert("Virhe", "Kokoelman nimi ei voi olla tyhjä");
    }
  };

  const addToCollection = (recipe, collectionIndex) => {
    const updatedCollections = [...collections];
    updatedCollections[collectionIndex].recipes.push(recipe);
    setCollections(updatedCollections);
  };

  const deleteCollection = (index) => {
    const updatedCollections = collections.filter((_, i) => i !== index);
    setCollections(updatedCollections);
  };

  const editCollection = (index) => {
    setEditingIndex(index);
    setNewCollectionName(collections[index].name);
  };

  const saveEditedCollection = () => {
    if (newCollectionName.trim() === "") {
      Alert.alert("Virhe", "Kokoelman nimi ei voi olla tyhjä");
      return;
    }
    const updatedCollections = [...collections];
    updatedCollections[editingIndex].name = newCollectionName;
    setCollections(updatedCollections);
    setEditingIndex(null);
    setNewCollectionName("");
  };

  const deleteRecipeFromCollection = (collectionIndex, recipeIndex) => {
    const updatedCollections = [...collections];
    updatedCollections[collectionIndex].recipes.splice(recipeIndex, 1);
    setCollections(updatedCollections);
  };

  const openAddRecipeModal = (index) => {
    setSelectedCollectionIndex(index);
    setAddRecipeModalVisible(true);
  };

  const selectRecipeToAdd = (recipe) => {
    addToCollection(recipe, selectedCollectionIndex);
    setAddRecipeModalVisible(false);
  };

  const viewRecipeDetails = (recipe) => {
    setRecipeDetail(recipe);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleOpen} style={styles.plusButton}>
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
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.collectionItem}>
            <View style={styles.collectionHeader}>
              <TouchableOpacity
                onPress={() =>
                  setMenuVisible(menuVisible === index ? null : index)
                }
              >
                <Text style={styles.collectionName}>{item.name}</Text>
              </TouchableOpacity>
            </View>

            {menuVisible === index && (
              <View style={styles.menuOptions}>
                <Button title="Muokkaa" onPress={() => editCollection(index)} />
                <Button
                  title="Poista"
                  color="red"
                  onPress={() => deleteCollection(index)}
                />
              </View>
            )}

            <FlatList
              data={item.recipes}
              keyExtractor={(recipe, idx) => idx.toString()}
              renderItem={({ item: recipe, index: recipeIndex }) => (
                <TouchableOpacity onPress={() => viewRecipeDetails(recipe)}>
                  <View style={styles.recipeItem}>
                    <Text style={styles.recipeName}>{recipe.name}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        deleteRecipeFromCollection(index, recipeIndex)
                      }
                    >
                      <Text style={styles.deleteText}>Poista</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.addRecipeButton}
                  onPress={() => openAddRecipeModal(index)}
                >
                  <Ionicons name="add-circle" size={24} color="green" />
                  <Text style={styles.addRecipeText}>Lisää resepti</Text>
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
          <View style={styles.modalContentTransparent}>
            <Text style={styles.header}>Valitse resepti lisättäväksi</Text>
            <FlatList
              data={recipes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectRecipeToAdd(item)}>
                  <Text style={styles.recipeName}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <Button
              title="Sulje"
              color="red"
              onPress={() => setAddRecipeModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      {recipeDetail && (
        <Modal
          visible={true}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setRecipeDetail(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContentTransparent}>
              <Text style={styles.header}>{recipeDetail.name}</Text>
              <Text style={styles.subHeader}>Ainesosat:</Text>
              {recipeDetail.ingredients.map((ing, idx) => (
                <Text key={idx}>
                  - {ing.name}: {ing.quantity} {ing.unit}
                </Text>
              ))}

              <Text style={styles.subHeader}>Ohjeet:</Text>
              <Text>{recipeDetail.instructions}</Text>
              <Button title="Sulje" onPress={() => setRecipeDetail(null)} />
            </View>
          </View>
        </Modal>
      )}

      {editingIndex !== null && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={true}
          onRequestClose={() => setEditingIndex(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContentTransparent}>
              <Text style={styles.header}>Muokkaa Kokoelmaa</Text>
              <TextInput
                style={styles.input}
                value={newCollectionName}
                onChangeText={setNewCollectionName}
              />
              <Button title="Tallenna" onPress={saveEditedCollection} />
              <Button
                title="Peruuta"
                color="red"
                onPress={() => setEditingIndex(null)}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  plusButton: {
    backgroundColor: "#007BFF",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  addRecipeButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
  },
  addRecipeText: {
    marginLeft: 5,
    color: "green",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentTransparent: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalContent: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
  collectionItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  collectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  collectionName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  menuOptions: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  recipeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    paddingVertical: 5,
  },
  recipeName: {
    fontSize: 14,
  },
  deleteText: {
    color: "red",
  },
});
