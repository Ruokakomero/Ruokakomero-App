import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ShowRecipes = ({ route }) => {
  // Otetaan UserInputFormista lähetetyt tiedot vastaan
  const { selectedProteins, selectedCarbs, servingSize, selectedDiets, otherProtein, otherCarb } = route.params;

  // Mock-reseptit (korvataan tekoälyllä myöhemmin)
  const recipes = [
    {
      id: "1",
      name: "Kanaa ja riisiä",
      servings: 2,
      ingredients: ["Kana", "Riisi", "Porkkana", "Mausteet"],
      instructions: "Kypsennä kana ja keitä riisi. Sekoita yhteen."
    },
    {
      id: "2",
      name: "Kasvispasta",
      servings: 2,
      ingredients: ["Pasta", "Tomaatti", "Paprika", "Juusto"],
      instructions: "Keitä pasta ja lisää kasvikset sekä juusto."
    },
    {
      id: "3",
      name: "Lohi ja perunat",
      servings: 3,
      ingredients: ["Lohi", "Perunat", "Sitruuna", "Tilli"],
      instructions: "Paista lohi ja keitä perunat. Mausta tillillä ja sitruunalla."
    },
    {
      id: "4",
      name: "Tofu-wokki",
      servings: 2,
      ingredients: ["Tofu", "Nuudelit", "Soijakastike", "Kasvikset"],
      instructions: "Paista tofu ja kasvikset. Lisää keitetyt nuudelit ja soijakastike."
    },
    {
      id: "5",
      name: "Omelettia ja salaattia",
      servings: 1,
      ingredients: ["Munat", "Juusto", "Salaatti", "Tomaatti"],
      instructions: "Paista omeletti ja tarjoile salaattipedillä."
    }
  ];

  // **Haetaan käyttäjän valintoihin sopiva resepti**
  const findMatchingRecipe = () => {
    return (
      recipes.find((recipe) =>
        selectedProteins.some((protein) => recipe.ingredients.includes(protein)) &&
        selectedCarbs.some((carb) => recipe.ingredients.includes(carb))
      ) || recipes[0] // Jos sopivaa ei löydy, valitaan ensimmäinen resepti
    );
  };

  const recipe = findMatchingRecipe();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Suositeltu resepti</Text>
      <View style={styles.recipeCard}>
        <Text style={styles.recipeTitle}>{recipe.name}</Text>
        <Text>Annoksia: {servingSize}</Text>
        <Text>Ainesosat: {recipe.ingredients.join(", ")}</Text>
        <Text>Ohje: {recipe.instructions}</Text>

        <TouchableOpacity style={styles.button} onPress={() => console.log("Tallennettu:", recipe.name)}>
          <Text style={styles.buttonText}>Tallenna</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => console.log("Lisätty ostoslistaan:", recipe.ingredients.join(", "))}>
          <Text style={styles.buttonText}>Lisää ostoslistalle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10
  },
  recipeCard: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    width: "100%"
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});

export default ShowRecipes;
