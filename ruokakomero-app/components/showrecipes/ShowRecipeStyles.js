// Tyylitiedosto ShowRecipes-komponentin refaktoroinnin yhteydessä luoduille komponenteille (Sprintti 4)
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  recipeCard: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    width: "100%",
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  ingredientText: {
    fontSize: 14,
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 14,
    marginBottom: 10,
  },
  sectionSpacing: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: "column",
    width: "100%",
  },
  buttonSpacing: {
    height: 10,
  },
});

export default styles;
