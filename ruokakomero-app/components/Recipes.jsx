import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import RecipeCollection from "./RecipeCollection";

export default function Recipes() {
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState({
    id: "",
    name: "",
    ingredients: [],
    instructions: [],
    image: "",
  });

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [value, setValue] = useState(null);
  const [view, setView] = useState("create"); 
  const [savedRecipes, setSavedRecipes] = useState([]); 

  const data = [
    { label: "kg", value: "1" },
    { label: "g", value: "2" },
    { label: "l", value: "3" },
    { label: "ml", value: "4" },
    { label: "kpl", value: "5" },
  ];

  const createItem = (name, quantity, unit) => {
    if (!name || !quantity || !unit) {
      setError("Kaikki kentät ovat pakollisia");
      Alert.alert("Error", error);
      return null;
    }
    setError(null);
    return {
      name: name,
      quantity: quantity,
      unit: unit,
      type: "",
    };
  };

  const handleAddItem = () => {
    const newItem = createItem(name, quantity, unit);

    if (newItem) {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        ingredients: [...prevRecipe.ingredients, newItem],
      }));

      setName("");
      setQuantity("");
      setValue(null);
    }
    console.log(recipe);
  };

  const saveRecipe = () => {
    if (!recipe.name || recipe.ingredients.length === 0) {
      Alert.alert("Error", "Syötä reseptille nimi ja lisää yksi ainesosa ennen tallentamista!");
      return;
    }

    setSavedRecipes([...savedRecipes, recipe]);
    setRecipe({
      id: "",
      name: "",
      ingredients: [],
      instructions: [],
      image: "",
    });
    Alert.alert("Success", "Resepti tallennettu!");
  };

  const addToCollection = (collection, collectionIndex) => {
    if (savedRecipes.length === 0) {
      Alert.alert("Error", "Ei reseptejä lisättävänä");
      return;
    }

 
    collection.recipes.push(savedRecipes[0]);
    Alert.alert("Success", `Testi -resepti lisätty ${collection.name}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Button title="Luo resepti" onPress={() => setView("create")} />
        <Button title="Näytä Reseptiryhmät" onPress={() => setView("collection")} />
      </View>

      {view === "create" ? (
        <View style={styles.createRecipe}>
          <Text style={styles.header}>Luo resepti</Text>
          <TextInput
            style={styles.input}
            placeholder="Reseptin nimi"
            value={recipe.name}
            onChangeText={(text) => setRecipe({ ...recipe, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Ainesosa"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Määrä"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          <Dropdown
            style={styles.input}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Yksikkö"
            value={value}
            onChange={(item) => {
              setValue(item.value);
              setUnit(item.label);
            }}
          />
          <Button title="Lisää ainesosa" onPress={handleAddItem} />
          <FlatList
            data={recipe.ingredients}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.name}</Text>
                <Text>
                  {item.quantity} {item.unit}
                </Text>
              </View>
            )}
          />
          <Button title="Tallenna resepti" onPress={saveRecipe} />
        </View>
      ) : (
        <RecipeCollection recipes={savedRecipes} onAddToCollection={addToCollection} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  createRecipe: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
