import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import RecipeCollection from "./RecipeCollection";
import { firestore } from "../constants/firebaseConfig";


export default function Recipes() {
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState({
    id: "",
    name: "",
    ingredients: [],
    instructions: [],
    image: "",
  });
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState(0);
  const [ingredientUnit, setIngredientUnit] = useState("kg");
  const [instructionStep, setInstructionStep] = useState("");

  // DEMODATAA 
  const [savedRecipes, setSavedRecipes] = useState([
    {
      id: "1",
      name: "Paprika-kana-pita",
      ingredients: [
        { name: "Paprika", quantity: "2", unit: "kg", type: "vegetable" },
        { name: "Kana", quantity: "1", unit: "kg", type: "meat" },
        { name: "Pita", quantity: "2", unit: "kg", type: "grain" },
      ],
      instructions: [
        "Paista paprika ja kana.",
        "Pistä Pitaleipä uuniin.",
        "Laita parika ja kana pitaleipään.",
      ],
      image: "https://example.com/paprika-kana-pita.jpg",
    },
    {
      id: "2",
      name: "Kermainen lohikeitto",
      ingredients: [
        { name: "Lohi", quantity: "1", unit: "kg", type: "fish" },
        { name: "Peruna", quantity: "1", unit: "kg", type: "vegetable" },
        { name: "Sipuli", quantity: "1", unit: "kg", type: "vegetable" },
        { name: "Kerma", quantity: "1", unit: "kg", type: "protein" },
        { name: "Purjo", quantity: "400", unit: "g", type: "vegetable" },
        { name: "Porkkana", quantity: "400", unit: "g", type: "vegetable" },
      ],
      instructions: [
        "Leikkaa ainesosat.",
        "Keitä ainekset n. 1l vedessä.",
        "Lisää halutessasi kermaa ja tilliä.",
      ],
      image: "https://example.com/kermainen-lohikeitto.jpg",
    },
    {
      id: "3",
      name: "Makaronilaatikko",
      ingredients: [
        { name: "Makaroni", quantity: "1", unit: "kg", type: "grain" },
        { name: "Jauheliha", quantity: "1", unit: "kg", type: "meat" },
        { name: "Maito", quantity: "1", unit: "l", type: "dairy" },
      ],
      instructions: [
        "Kypsennä makaroni ja jauheliha.",
        "Seikoita ainekset uunivuokaan keskenään.",
        "Paista uunissa 200 asteessa 30 minuuttia.",
      ],
      image: "https://example.com/makaronilaatikko.jpg",
    },
  ]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isRecipeDetailVisible, setIsRecipeDetailVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(null);
  const [activeTab, setActiveTab] = useState("reseptit");


  // Yksikkö-sliderin asetukset
  const unitSettings = {
    kg: { min: 0, max: 5, step: 0.1 },
    g: { min: 0, max: 1000, step: 50 },
    l: { min: 0, max: 5, step: 0.1 },
    ml: { min: 0, max: 1000, step: 50 },
    kpl: { min: 0, max: 20, step: 1 },
  };

  const handleAddIngredient = () => {
    if (!ingredientName || ingredientQuantity <= 0) {
      Alert.alert("Virhe", "Täytä kaikki ainesosan kentät!");
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

  const handleAddInstruction = () => {
    if (!instructionStep) {
      Alert.alert("Virhe", "Lisää ohje!");
      return;
    }
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: [...prevRecipe.instructions, instructionStep],
    }));
    setInstructionStep("");
  };

  const handleAddRecipe = async (newRecipe) => {
    if (!recipe.name || recipe.ingredients.length === 0) {
      Alert.alert("Virhe", "Lisää reseptin nimi ja vähintään yksi ainesosa!");
      return;
    }
    try {
      await firestore.collection("recipes").add(newRecipe);
      Alert.alert("Resepti " + recipe.name + " lisätty!");

      setSavedRecipes([...savedRecipes, { ...recipe, id: Date.now().toString() }]);
      setRecipe({
        id: "",
        name: "",
        ingredients: [],
        instructions: [],
        image: "",
      });
      setIsAddModalVisible(false);
    } catch (error) {
      console.error("Error adding recipe:", error);
      Alert.alert("Error", "Reseptin lisääminen epäonnistui.");
    }
  };

  const handleDeleteRecipe = (id) => {
    const updatedRecipes = savedRecipes.filter((rec) => rec.id !== id);
    setSavedRecipes(updatedRecipes);
  };

  const handleEditRecipe = (id) => {
    const recipeToEdit = savedRecipes.find((rec) => rec.id === id);
    if (recipeToEdit) {
      setRecipe(recipeToEdit);
      setIsAddModalVisible(true);
    }
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsRecipeDetailVisible(true);
  };

  const filteredRecipes = savedRecipes.filter((rec) =>
    rec.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const unsubscribe = firestore.collection("recipes").onSnapshot(
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Update state with data from Firestore
        setSavedRecipes(list);
      },
      (error) => {
        console.error("Error fetching recipes:", error);
        Alert.alert("Error", "There was an error fetching recipes.");
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>


      {/* Tabit */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "reseptit" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("reseptit")}
        >
          <Text style={styles.tabText}>Reseptit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "kokoelmat" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("kokoelmat")}
        >
          <Text style={styles.tabText}>Kokoelmat</Text>
        </TouchableOpacity>
      </View>

      {activeTab === "reseptit" ? (
        <>
          <View style={styles.topButtonsContainer}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() => setIsAddModalVisible(true)}
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() => setIsSearchActive(!isSearchActive)}
            >
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {isSearchActive && (
            <TextInput
              style={styles.searchInput}
              placeholder="Hae reseptejä"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          )}

          <Text style={styles.header}>Tallennetut Reseptit</Text>
          <FlatList
            data={filteredRecipes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleViewRecipe(item)}>
                <View style={styles.recipeCard}>
                  <View style={styles.recipeHeader}>
                    <Text style={styles.recipeName}>{item.name}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        setMenuVisible(menuVisible === item.id ? null : item.id)
                      }
                    >
                      <Ionicons
                        name="ellipsis-vertical"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>

                  {menuVisible === item.id && (
                    <View style={styles.menuOptions}>
                      <Button
                        title="Muokkaa"
                        onPress={() => handleEditRecipe(item.id)}
                      />
                      <Button
                        title="Poista"
                        color="red"
                        onPress={() => handleDeleteRecipe(item.id)}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />

          <Modal
            visible={isAddModalVisible}
            animationType="slide"
            transparent={true}
          >
            <TouchableWithoutFeedback
              onPress={() => setIsAddModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContentCreate}>
                  <Text style={styles.header}>Luo Resepti</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Reseptin nimi"
                    value={recipe.name}
                    onChangeText={(text) =>
                      setRecipe({ ...recipe, name: text })
                    }
                  />

                  <Text style={styles.subHeader}>Lisää Ainesosa</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ainesosan nimi"
                    value={ingredientName}
                    onChangeText={setIngredientName}
                  />
                  <Text style={styles.subHeader}>
                    Määrä: {ingredientQuantity} {ingredientUnit}
                  </Text>
                  <Slider
                    style={{ width: "100%", height: 40 }}
                    minimumValue={unitSettings[ingredientUnit].min}
                    maximumValue={unitSettings[ingredientUnit].max}
                    step={unitSettings[ingredientUnit].step}
                    value={ingredientQuantity}
                    onValueChange={setIngredientQuantity}
                    minimumTrackTintColor="#007BFF"
                    maximumTrackTintColor="#ccc"
                  />

                  <Picker
                    selectedValue={ingredientUnit}
                    style={styles.input}
                    onValueChange={(itemValue) => setIngredientUnit(itemValue)}
                  >
                    <Picker.Item label="kg" value="kg" />
                    <Picker.Item label="g" value="g" />
                    <Picker.Item label="l" value="l" />
                    <Picker.Item label="ml" value="ml" />
                    <Picker.Item label="kpl" value="kpl" />
                  </Picker>
                  <Button
                    title="Lisää Ainesosa"
                    onPress={handleAddIngredient}
                  />

                  <FlatList
                    data={recipe.ingredients}
                    keyExtractor={(item, index) => `${item.name}-${index}`}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item, index }) => (
                      <Text style={styles.ingredientItem}>
                        {index + 1}. {item.name} - {item.quantity} {item.unit}
                      </Text>
                    )}
                  />

                  <Text style={styles.subHeader}>Lisää Ohjeet</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Kirjoita ohje"
                    value={instructionStep}
                    onChangeText={setInstructionStep}
                  />
                  <Button title="Lisää Ohje" onPress={handleAddInstruction} />

                  <FlatList
                    data={recipe.instructions}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item, index }) => (
                      <Text>{`${index + 1}. ${item}`}</Text>
                    )}
                  />
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleAddRecipe}
                  >
                    <Text style={styles.saveButtonText}>Tallenna</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setIsAddModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Sulje</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </>
      ) : (
        <RecipeCollection recipes={savedRecipes} />
      )}
      <Modal
        visible={isRecipeDetailVisible}
        animationType="slide"
        transparent={true}
      >
        <TouchableWithoutFeedback
          onPress={() => setIsRecipeDetailVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <ScrollView style={styles.modalContentRecipe}>
              <Text style={styles.header}>{selectedRecipe?.name}</Text>
              <Text style={styles.subHeader}>Ainesosat</Text>
              {selectedRecipe?.ingredients.map((ing, idx) => (
                <Text
                  key={idx}
                >{`${ing.name}: ${ing.quantity} ${ing.unit}`}</Text>
              ))}

              <Text style={styles.subHeader}>Ohjeet</Text>
              {selectedRecipe?.instructions.map((step, idx) => (
                <Text key={idx}>{`${idx + 1}. ${step}`}</Text>
              ))}

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsRecipeDetailVisible(false)}
              >
                <Text style={styles.closeButtonText}>Sulje</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentCreate: {
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
  modalContentRecipe: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginTop: 50,
    shadowColor: "#000",
    width: "90%",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: "40%",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
  circleButton: {
    backgroundColor: "#007BFF",
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
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
  recipeCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  recipeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  menuOptions: {
    marginTop: 10,
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 5,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#8a3633",
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
  },
  saveButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeTab: {
    backgroundColor: "#007BFF",
  },
  tabText: {
    color: "#000",
    fontWeight: "bold",
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
});
