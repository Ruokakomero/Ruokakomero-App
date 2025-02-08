import React, { useState } from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DeleteButton from './DeleteButton';
import styles from '../constants/styles';
import Painike from './Painike';

const AddProduct = () => {
  const [productList, setProductList] = useState({
    jääkaappi: [],
    pakastin: [],
    kuivakaappi: [],
  });

  const [expandedLocation, setExpandedLocation] = useState(null); 
  const [newItem, setNewItem] = useState(""); 
  const [addingToLocation, setAddingToLocation] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
  const [editedText, setEditedText] = useState("");
  
  
  const toggleAddItem = (location) => {
    if (addingToLocation === location) {
      setAddingToLocation(null);
    } else {
      setAddingToLocation(location);
      setNewItem("");
    }
  };

    const addItem = (location) => {
    if (!newItem.trim()) return;

    setProductList((prevList) => ({
      ...prevList,
      [location]: [...prevList[location], { key: newItem, id: Date.now().toString(), location }],
    }));

    setNewItem("");
    setAddingToLocation(null); 
  };

 
  const startEditing = (location, id, text) => {
    setEditedItem({ location, id });
    setEditedText(text);
  };

  
  const saveEdit = () => {
    if (!editedItem || !editedText.trim()) return;

    setProductList((prevList) => ({
      ...prevList,
      [editedItem.location]: prevList[editedItem.location].map((item) =>
        item.id === editedItem.id ? { ...item, key: editedText } : item
      ),
    }));

    setEditedItem(null);
  };

  
  const deleteItem = (location, id) => {
    setProductList((prevList) => ({
      ...prevList,
      [location]: prevList[location].filter((item) => item.id !== id),
    }));
  };

 
  const clearLocation = (location) => {
    Alert.alert(
      "Vahvista tyhjennys",
      `Haluatko varmasti poistaa kaikki tuotteet säilytyksestä ${location.toUpperCase()}?`,
      [
        { text: "Peruuta", style: "cancel" },
        {
          text: "Poista kaikki",
          style: "destructive",
          onPress: () => {
            setProductList((prevList) => ({
              ...prevList,
              [location]: [],
            }));
          },
        },
      ]
    );
  };

  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainContainer}>
        {Object.keys(productList).map((location) => (
          <View key={location} style={styles.listContainer}>
            <View style={styles.locationContainer}>
              <Text style={styles.locationHeader}>{location.toUpperCase()}</Text>

              <TouchableOpacity onPress={() => toggleAddItem(location)} activeOpacity={0.7}>
                <AntDesign
                  name={addingToLocation === location ? "minuscircleo" : "pluscircleo"}
                  size={24}
                  color="#009688"
                  style={styles.addIcon}
                />
              </TouchableOpacity>
            </View>

     
            {addingToLocation === location && (
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Lisää tuote"
                  value={newItem}
                  onChangeText={setNewItem}
                />
                <TouchableOpacity onPress={() => addItem(location)} style={styles.addButton}>
                  <AntDesign name="check" size={20} color="white" />
                </TouchableOpacity>
              </View>
            )}

            <FlatList
              data={productList[location]}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  {editedItem?.id === item.id ? (
                    <TextInput
                      style={styles.input}
                      value={editedText}
                      onChangeText={setEditedText}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => startEditing(location, item.id, item.key)}>
                      <Text>{item.key}</Text>
                    </TouchableOpacity>
                  )}

                  {editedItem?.id === item.id ? (
                    <TouchableOpacity onPress={saveEdit} style={styles.editButton}>
                      <AntDesign name="check" size={18} color="white" />
                    </TouchableOpacity>
                  ) : (
                    <DeleteButton onPress={() => deleteItem(location, item.id)} />
                  )}
                </View>
              )}
            />

          
            {productList[location].length > 0 && (
                <Painike 
                title={"Tyhjennä " + location.toUpperCase()}
                onPress={() => clearLocation(location)}/>
            )}
          </View>
        ))}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddProduct;
