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
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import RecipeCollection from "./RecipeCollection";
import { database } from "../constants/firebaseConfig";
import { ref, push, onValue, remove, update } from "firebase/database";

{
  /* Code review osuus alkaa*/
}

export default function Recipes() {
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
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
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isRecipeDetailVisible, setIsRecipeDetailVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("reseptit");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [originalRecipe, setOriginalRecipe] = useState(null);

  const openEditModal = (recipe) => {
    setOriginalRecipe({ ...recipe });
    setRecipe(recipe);
    setIsEditModalVisible(true);
  };

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

  const handleAddRecipe = async () => {
    if (!recipe.name || recipe.ingredients.length === 0) {
      Alert.alert("Virhe", "Lisää reseptin nimi ja vähintään yksi ainesosa!");
      return;
    }

    try {
      const newRecipeRef = push(ref(database, "recipes/"));
      const newRecipeKey = newRecipeRef.key;

      const newRecipe = { ...recipe, id: newRecipeKey };

      await update(ref(database, `recipes/${newRecipeKey}`), newRecipe);

      setRecipe({
        id: "",
        name: "",
        ingredients: [],
        instructions: [],
        image: "",
      });

      setIsAddModalVisible(false);
      setCurrentStep(1);
    } catch (error) {
      console.log(error);
      setError("Virhe", "Tallennus epäonnistui!");
      Alert.alert(error.message);
    }
  };

  const handleDeleteRecipe = async (id) => {
    Alert.alert(
      "Varoitus",
      "Haluatko varmasti poistaa tämän reseptin?",
      [
        {
          text: "Peruuta",
          style: "cancel",
        },
        {
          text: "Kyllä",
          onPress: async () => {
            try {
              await remove(ref(database, `recipes/${id}`));
              setSavedRecipes(savedRecipes.filter((rec) => rec.id !== id));
            } catch (error) {
              setError("Virhe", "Poisto epäonnistui!");
              Alert.alert(error.message);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditRecipe = async () => {
    if (!recipe.id) {
      Alert.alert("Virhe", "Reseptiä ei voi muokata ilman ID:tä!");
      return;
    }

    try {
      // Varmistetaan, että ingredients ei ole undefined
      const updatedRecipe = {
        ...recipe,
        ingredients: recipe.ingredients ? recipe.ingredients : [],
        instructions: recipe.instructions ? recipe.instructions : [],
      };

      await update(ref(database, `recipes/${recipe.id}`), {
        ...updatedRecipe,
        ingredients:
          updatedRecipe.ingredients.length > 0 ? updatedRecipe.ingredients : [],
      });

      // Päivitetään lista käyttöliittymässä
      setSavedRecipes((prevRecipes) =>
        prevRecipes.map((rec) => (rec.id === recipe.id ? updatedRecipe : rec))
      );

      setIsEditModalVisible(false);
      setRecipe({
        id: "",
        name: "",
        ingredients: [],
        instructions: [],
        image: "",
      });

      Alert.alert("Tallennettu", "Resepti päivitettiin onnistuneesti!");
    } catch (error) {
      Alert.alert("Virhe", "Muokkaus epäonnistui!");
      console.error("Error updating recipe: ", error);
    }
  };

  const filteredRecipes = savedRecipes.filter((rec) =>
    rec.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const confirmClose = () => {
    const hasChanges =
      JSON.stringify(recipe.ingredients) !==
        JSON.stringify(originalRecipe.ingredients) ||
      JSON.stringify(recipe.instructions) !==
        JSON.stringify(originalRecipe.instructions) ||
      recipe.name !== originalRecipe.name ||
      recipe.image !== originalRecipe.image;

    if (hasChanges) {
      Alert.alert(
        "Varoitus",
        "Haluatko poistua tallentamatta muutokset?",
        [
          {
            text: "Peruuta",
            style: "cancel",
          },
          {
            text: "Sulje tallentamatta",
            onPress: () => setIsEditModalVisible(false),
          },
        ],
        { cancelable: true }
      );
    } else {
      setIsEditModalVisible(false);
    }
  };

  {
    /* Code review osuus päättyy*/
  }

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
          <View style={styles.circleButtonContainer}>
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
              <TouchableOpacity
                onLongPress={() => {
                  setRecipe(item);
                  setSelectedRecipe(item);
                  setIsRecipeDetailVisible(true);
                }}
              >
                <View style={styles.recipeCard}>
                  <View style={styles.recipeHeader}>
                    <Text style={styles.recipeName}>{item.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Ei tallennettuja reseptejä</Text>
            }
          />

          <Modal
            visible={isAddModalVisible}
            animationType="slide"
            transparent={true}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContentCreate}>
                    <Text style={styles.header}>{recipe.name}</Text>

                    <View style={styles.stepContainer}>
                      {currentStep === 1 && (
                        <>
                          <Text style={styles.header}>Perustiedot</Text>
                          <TextInput
                            style={styles.input}
                            placeholder="Reseptin nimi"
                            value={recipe.name}
                            onChangeText={(text) =>
                              setRecipe({ ...recipe, name: text })
                            }
                          />
                          <TextInput
                            style={styles.input}
                            placeholder="Kuvan URL (valinnainen)"
                            value={recipe.image}
                            onChangeText={(text) =>
                              setRecipe({ ...recipe, image: text })
                            }
                          />
                        </>
                      )}

                      {currentStep === 2 && (
                        <>
                          <Text style={styles.header}>Lisää Ainesosia</Text>
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
                          />
                          <Picker
                            selectedValue={ingredientUnit}
                            style={styles.input}
                            onValueChange={(itemValue) =>
                              setIngredientUnit(itemValue)
                            }
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
                            keyExtractor={(item, index) =>
                              `${item.name}-${index}`
                            }
                            renderItem={({ item, index }) => (
                              <Text>
                                {index + 1}. {item.name} - {item.quantity}{" "}
                                {item.unit}
                              </Text>
                            )}
                          />
                        </>
                      )}

                      {currentStep === 3 && (
                        <>
                          <Text style={styles.header}>Lisää Ohjeita</Text>
                          <TextInput
                            style={styles.input}
                            placeholder="Kirjoita ohje"
                            value={instructionStep}
                            onChangeText={setInstructionStep}
                          />
                          <Button
                            title="Lisää Ohje"
                            onPress={handleAddInstruction}
                          />

                          <FlatList
                            data={recipe.instructions}
                            keyExtractor={(item, index) => `${item}-${index}`}
                            renderItem={({ item, index }) => (
                              <Text>{`${index + 1}. ${item}`}</Text>
                            )}
                          />
                        </>
                      )}

                      {/* Step Navigation Buttons */}
                      <View style={styles.navButtons}>
                        {currentStep > 1 && (
                          <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => setCurrentStep(currentStep - 1)}
                          >
                            <Text style={styles.backButtonText}>Edellinen</Text>
                          </TouchableOpacity>
                        )}
                        {currentStep < 3 ? (
                          <TouchableOpacity
                            style={styles.nextButton}
                            onPress={() => setCurrentStep(currentStep + 1)}
                          >
                            <Text style={styles.nextButtonText}>Seuraava</Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleAddRecipe}
                          >
                            <Text style={styles.saveButtonText}>Tallenna</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setIsAddModalVisible(false)}
                    >
                      <Text style={styles.closeButtonText}>Sulje</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
            visible={isEditModalVisible}
            animationType="slide"
            transparent={true}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContentCreate}>
                    <ScrollView
                      style={{ width: "100%" }}
                      contentContainerStyle={styles.scrollContainer}
                      keyboardShouldPersistTaps="handled"
                      showsVerticalScrollIndicator={false}
                    >
                      <Text style={styles.header}>Muokkaa Reseptiä</Text>

                      {/* Recipe Name */}
                      <Text style={styles.subHeader}>Reseptin nimi</Text>
                      <View style={styles.inputRow}>
                        <TextInput
                          style={styles.fullInput}
                          value={recipe.name}
                          placeholder="Anna reseptin nimi"
                          onChangeText={(text) =>
                            setRecipe({ ...recipe, name: text })
                          }
                        />
                      </View>

                      {/* Recipe Image URL */}
                      <Text style={styles.subHeader}>Kuvan URL</Text>
                      <View style={styles.inputRow}>
                        <TextInput
                          style={styles.fullInput}
                          value={recipe.image}
                          placeholder="Lisää kuvan URL (valinnainen)"
                          onChangeText={(text) =>
                            setRecipe({ ...recipe, image: text })
                          }
                        />
                      </View>

                      {/* Ingredients List */}
                      <Text style={styles.subHeader}>Ainesosat</Text>
                      {recipe.ingredients.map((item, index) => (
                        <View key={index} style={styles.ingredientRow}>
                          <TextInput
                            style={styles.ingredientNameInput}
                            value={item.name}
                            placeholder="Ainesosan nimi"
                            onChangeText={(text) => {
                              const updatedIngredients = [
                                ...recipe.ingredients,
                              ];
                              updatedIngredients[index].name = text;
                              setRecipe({
                                ...recipe,
                                ingredients: updatedIngredients,
                              });
                            }}
                          />
                          <View style={styles.quantityWrapper}>
                            <TextInput
                              style={styles.ingredientQuantityInput}
                              value={item.quantity}
                              keyboardType="numeric"
                              placeholder="Määrä"
                              onChangeText={(text) => {
                                const updatedIngredients = [
                                  ...recipe.ingredients,
                                ];
                                updatedIngredients[index].quantity = text;
                                setRecipe({
                                  ...recipe,
                                  ingredients: updatedIngredients,
                                });
                              }}
                            />
                            <TouchableOpacity
                              style={styles.unitButton}
                              onPress={() => {
                                const units = ["kg", "g", "l", "ml", "kpl"];
                                const nextUnit =
                                  units[
                                    (units.indexOf(item.unit) + 1) %
                                      units.length
                                  ];

                                const updatedIngredients = [
                                  ...recipe.ingredients,
                                ];
                                updatedIngredients[index].unit = nextUnit;
                                setRecipe({
                                  ...recipe,
                                  ingredients: updatedIngredients,
                                });
                              }}
                            >
                              <Text style={styles.unitText}>{item.unit}</Text>
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              setRecipe({
                                ...recipe,
                                ingredients: recipe.ingredients.filter(
                                  (_, i) => i !== index
                                ),
                              });
                            }}
                          >
                            <Ionicons
                              name="trash-outline"
                              size={24}
                              color="red"
                            />
                          </TouchableOpacity>
                        </View>
                      ))}

                      {/* Add New Ingredient */}
                      <View style={styles.ingredientRow}>
                        <TextInput
                          style={styles.ingredientNameInput}
                          placeholder="Uusi ainesosa"
                          value={ingredientName}
                          onChangeText={setIngredientName}
                        />
                        <View style={styles.quantityWrapper}>
                          <TextInput
                            style={styles.ingredientQuantityInput}
                            placeholder="Määrä"
                            keyboardType="numeric"
                            value={ingredientQuantity}
                            onChangeText={setIngredientQuantity}
                          />
                          <TouchableOpacity
                            style={styles.unitButton}
                            onPress={() => {
                              const units = ["kg", "g", "l", "ml", "kpl"];
                              const nextUnit =
                                units[
                                  (units.indexOf(ingredientUnit) + 1) %
                                    units.length
                                ];
                              setIngredientUnit(nextUnit);
                            }}
                          >
                            <Text style={styles.unitText}>
                              {ingredientUnit}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            if (!ingredientName || ingredientQuantity <= 0) {
                              Alert.alert(
                                "Virhe",
                                "Täytä kaikki ainesosan kentät!"
                              );
                              return;
                            }
                            setRecipe({
                              ...recipe,
                              ingredients: [
                                ...recipe.ingredients,
                                {
                                  name: ingredientName,
                                  quantity: ingredientQuantity,
                                  unit: ingredientUnit,
                                },
                              ],
                            });
                            setIngredientName("");
                            setIngredientQuantity("");
                          }}
                        >
                          <Ionicons
                            name="add-circle-outline"
                            size={24}
                            color="green"
                          />
                        </TouchableOpacity>
                      </View>

                      {/* Instructions List */}
                      <Text style={styles.subHeader}>Ohjeet</Text>
                      {recipe.instructions.map((item, index) => (
                        <View key={index} style={styles.ingredientRow}>
                          <TextInput
                            style={styles.ingredientInput}
                            value={item}
                            placeholder="Muokkaa ohjetta"
                            onChangeText={(text) => {
                              const updatedInstructions = [
                                ...recipe.instructions,
                              ];
                              updatedInstructions[index] = text;
                              setRecipe({
                                ...recipe,
                                instructions: updatedInstructions,
                              });
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              setRecipe({
                                ...recipe,
                                instructions: recipe.instructions.filter(
                                  (_, i) => i !== index
                                ),
                              });
                            }}
                          >
                            <Ionicons
                              name="trash-outline"
                              size={20}
                              color="red"
                            />
                          </TouchableOpacity>
                        </View>
                      ))}

                      {/* Add New Instruction */}
                      <View style={styles.ingredientRow}>
                        <TextInput
                          style={styles.ingredientInput}
                          placeholder="Lisää uusi ohje"
                          value={instructionStep}
                          onChangeText={setInstructionStep}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            if (!instructionStep) return;
                            setRecipe({
                              ...recipe,
                              instructions: [
                                ...recipe.instructions,
                                instructionStep,
                              ],
                            });
                            setInstructionStep("");
                          }}
                        >
                          <Ionicons
                            name="add-circle-outline"
                            size={24}
                            color="green"
                          />
                        </TouchableOpacity>
                      </View>

                      {/* Save Changes Button */}
                      <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => {
                          handleEditRecipe();
                          setIsEditModalVisible(false);
                        }}
                      >
                        <Text style={styles.saveButtonText}>
                          Tallenna muutokset
                        </Text>
                      </TouchableOpacity>

                      {/* Close Button */}
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => confirmClose()}
                      >
                        <Text style={styles.closeButtonText}>Sulje</Text>
                      </TouchableOpacity>
                    </ScrollView>
                  </View>
                </TouchableWithoutFeedback>
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
                <Text style={styles.paragraph} key={idx}>{`${
                  idx + 1
                }. ${step}`}</Text>
              ))}

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  handleDeleteRecipe(selectedRecipe?.id);
                  setIsRecipeDetailVisible(false);
                }}
              >
                <Text style={styles.closeButtonText}>Poista</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setRecipe(selectedRecipe);
                  setIsRecipeDetailVisible(false);
                  setIsEditModalVisible(true);
                  openEditModal(selectedRecipe);
                }}
              >
                <Text style={styles.editButtonText}>Muokkaa</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  /* Yleinen container-tyyli */
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  /* Modaalien asettelut */
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
    maxHeight: "60%",
  },

  /* Tekstit ja otsikot */
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
  paragraph: {
    fontSize: 14,
    marginBottom: 10,
  },

  /* Napit ja niiden tyylit */
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
  editButton: {
    padding: 10,
    backgroundColor: "#FFA500",
    borderRadius: 5,
    marginTop: 10,
  },
  editButtonText: {
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
  circleButton: {
    backgroundColor: "#007BFF",
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },

  /* Navigointinapit */
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  nextButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  nextButtonText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
  },

  /* Tab- ja hakunapit */
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
  searchInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  circleButtonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },

  /* Yleiset syöttökentät */
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
  fullInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },

  /* Ainesosa- ja ohjekentät */
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  ingredientNameInput: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "white",
  },
  quantityWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 10,
  },
  ingredientQuantityInput: {
    width: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "white",
    textAlign: "center",
  },
  unitButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 5,
  },
  unitText: {
    color: "white",
    fontWeight: "bold",
  },

  /* Muu ulkoasu ja listaukset */
  recipeCard: {
    padding: 15,
    borderWidth: 3,
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
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
