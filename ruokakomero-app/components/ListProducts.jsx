import React, { useState } from 'react';
import { FlatList, TextInput, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
/*POISTETAANKO?*/
const ListProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("jääkaappi");

  // Testi-ainesosat
  const ingredients = {
    jääkaappi: ["Maito", "Juusto", "Voi"],
    pakastin: ["Pakastepizza", "Marjat", "Jäätelö"],
    ruokakomero: ["Pasta", "Riisi", "Säilykkeet"]
  };

  const filteredIngredients = ingredients[selectedCategory].filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Kategoriat ja painikkeet */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>Kategoriat</Text>
        <View style={styles.categoryButtons}>
          <TouchableOpacity style={styles.button} onPress={() => setSelectedCategory("jääkaappi")}>
            <Text style={styles.buttonText}>Jääkaappi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setSelectedCategory("pakastin")}>
            <Text style={styles.buttonText}>Pakastin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setSelectedCategory("ruokakomero")}>
            <Text style={styles.buttonText}>Ruokakomero</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        placeholder="Hae ainesosia"
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.input}
      />

      <Text style={styles.listTitle}>{selectedCategory} ainesosat:</Text>

      <FlatList
        data={filteredIngredients}
        renderItem={({ item }) => <Text style={styles.ingredientItem}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  ingredientItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default ListProducts;
