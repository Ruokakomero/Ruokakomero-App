import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function RecipeCollection({ recipes, onAddToCollection }) {
  const [collectionName, setCollectionName] = useState('');
  const [collections, setCollections] = useState([]);

  const createCollection = () => {
    if (collectionName.trim() !== '') {
      setCollections([...collections, { name: collectionName, recipes: [] }]);
      setCollectionName('');
    } else {
      Alert.alert('Error', 'Collection name cannot be empty');
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

  const deleteRecipeFromCollection = (collectionIndex, recipeIndex) => {
    const updatedCollections = [...collections];
    updatedCollections[collectionIndex].recipes.splice(recipeIndex, 1);
    setCollections(updatedCollections);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Collection</Text>
      <TextInput
        style={styles.input}
        placeholder="Collection Name"
        value={collectionName}
        onChangeText={setCollectionName}
      />
      <Button title="Create" onPress={createCollection} />

      <FlatList
        data={collections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.collectionItem}>
            <Text style={styles.collectionName}>{item.name}</Text>
            <Button
              title="Add Recipe"
              onPress={() => onAddToCollection(item, index)}
            />
            <Button
              title="Delete Collection"
              color="red"
              onPress={() => deleteCollection(index)}
            />
            <FlatList
              data={item.recipes}
              keyExtractor={(recipe, idx) => idx.toString()}
              renderItem={({ item: recipe, index: recipeIndex }) => (
                <View style={styles.recipeItem}>
                  <Text style={styles.recipeName}>{recipe.name}</Text>
                  <TouchableOpacity
                    onPress={() => deleteRecipeFromCollection(index, recipeIndex)}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  collectionItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  collectionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    paddingVertical: 5,
  },
  recipeName: {
    fontSize: 14,
  },
  deleteText: {
    color: 'red',
  },
});
