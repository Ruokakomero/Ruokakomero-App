import React, { useState } from 'react';
import { FlatList, Keyboard, Text, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Painike from './Painike'; 
import DeleteButton from './DeleteButton';
import DropDown from './DropDown';
import styles from '../constants/styles';

const AddProduct = () => {
  const [product, setProduct] = useState("");
  const [storageLocation, setStorageLocation] = useState(null);
  const [productList, setProductList] = useState({ 
    jääkaappi: [],
    pakastin: [],
    kuivakaappi: [],
  });

  const [editedItem, setEditedItem] = useState(null);
  const [editedText, setEditedText] = useState("");

  const addPressed = () => {
    if (!product.trim() || !storageLocation) return; 

    setProductList(prevList => ({
      ...prevList,
      [storageLocation]: [...prevList[storageLocation], { key: product, id: Date.now().toString(), location: storageLocation }]
    }));

    setProduct(""); 
  };

  const clearPressed = () => {
    setProductList({ jääkaappi: [], pakastin: [], ruokakomero: [] }); 
  };

  const editingMode = (location, id, text) => {
    setEditedItem({location,id});
    setEditedText(text);
  }

  const saveChanges = () => {
    if (!editedItem || !editedText.trim()) return;
  
    setProductList(prevList => ({
      ...prevList,
      [editedItem.location]: prevList[editedItem.location].map(item =>
        item.id === editedItem.id ? { ...item, key: editedText } : item 
      ),
    }));
  
    setEditedItem(null); 
  };

  const deleteItem = (location, id) => {
    setProductList(prevList => ({
      ...prevList,
      [location]: prevList[location].filter(item => item.id !== id) 
    }));
    
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.textInputs}>
          <TextInput
            placeholder='Lisää ainesosa'
            onChangeText={setProduct}
            value={product}
            style={styles.input}
          />

          <DropDown onSelect={setStorageLocation} />

          <View style={styles.buttons}>
            <Painike onPress={addPressed} title="Lisää" />
            <Painike onPress={clearPressed} title="Tyhjennä" />
          </View>
        </View>

        <Text>Ainesosien lista:</Text>

        {Object.keys(productList).map(location => (
          <View key={location} style={styles.listSection}>
            <Text style={styles.locationHeader}>{location.toUpperCase()}</Text>
            <FlatList
              data={productList[location]}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  {editedItem?.id === item.id ? (
                    <TextInput
                      style={styles.input}
                      value={editedText}
                      onChangeText={setEditedText}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => editingMode(location, item.id, item.key)}>
                      <Text>{item.key}</Text>
                    </TouchableOpacity>
                  )}

                  {editedItem?.id === item.id ? (
                    <Painike onPress={saveChanges} title="Tallenna" />
                  ) : (
                    <DeleteButton onPress={() => deleteItem(location, item.id)} title="Poista" />

                  )}

                 

                </View>
              )}
            />
          </View>
        ))}
      </View>
    </TouchableWithoutFeedback>
  );
};



export default AddProduct;