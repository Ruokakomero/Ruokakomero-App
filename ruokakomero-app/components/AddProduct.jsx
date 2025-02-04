import React, { useState } from 'react';
import { FlatList, Keyboard, Text, View, TouchableWithoutFeedback, TextInput, StyleSheet } from 'react-native';
import Painike from './Painike'; 
import DropDown from './DropDown'

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

const styles = StyleSheet.create({
  container: {
    paddingTop: 300,
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputs: {
    marginBottom: 20,
  },
  input: {
    borderColor: '#000',
    borderWidth: 0.5,
    marginBottom: 10,
    padding: 8,
    width: 200,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '25%',
  },
});

export default AddProduct;
