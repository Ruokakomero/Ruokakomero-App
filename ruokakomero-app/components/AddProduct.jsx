import React, { useState } from 'react';
import { FlatList, Keyboard, Text, View, TouchableWithoutFeedback, TextInput, StyleSheet } from 'react-native';
import Painike from './Painike'; 
import DropDown from './DropDown'
import  styles  from '../constants/styles';

const AddProduct = () => {
  const [product, setProduct] = useState("");
  const [productList, setProductList] = useState([]);

  const addPressed = () => {
    setProductList(prevProductList => [...prevProductList, { key: product }]);
    setProduct(""); // Tyhjentää listan
  };

  const clearPressed = () => {
    setProductList([]);
  };

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

       <DropDown/>

          <View style={styles.buttons}>
            <Painike onPress={addPressed} title="Lisää" />
            <Painike onPress={clearPressed} title="Tyhjennä" />
          </View>
        </View>

        <Text>Ainesosien lista:</Text>
        <FlatList
          data={productList}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};



export default AddProduct;
