import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ShowRecipes = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tänne on tulossa 5 reseptiä</Text>
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
    textAlign: "center"
  }
});

export default ShowRecipes;