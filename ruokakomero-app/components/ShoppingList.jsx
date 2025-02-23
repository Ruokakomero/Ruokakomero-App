import { StyleSheet, Text, TextInput, Button, View, Alert, FlatList } from 'react-native';
import { app } from '../constants/firebaseConfig';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { useState, useEffect } from 'react';

export default function ShoppingList() {

  const [product, setProduct] = useState({
    title: '',
    amount: ''
  });
  const [items, setItems] = useState([]);

  const database = getDatabase(app);

  const handleSave = () => {
    if (product.amount && product.title) {
      // Tallennetaan tuote ja saadaan yksilöivä avain (key)
      push(ref(database, 'items/'), product);
    } else {
      Alert.alert('Error', 'Type product and amount first');
    }
  }

  // Poistotoiminto
  const deleteItem = (id) => {
    const itemRef = ref(database, `items/${id}`);
    remove(itemRef)
      .then(() => {
        Alert.alert('Item removed successfully');
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to remove item');
      });
  };

  // Haetaan tiedot tietokannasta
  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Muutetaan data objektiksi, joka sisältää sekä key:n että tuotteen tiedot
        const loadedItems = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setItems(loadedItems);
      } else {
        setItems([]); // Jos ei ole kohteita
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Product title'
        onChangeText={text => setProduct({ ...product, title: text })}
        value={product.title} />
      <TextInput
        placeholder='Amount'
        onChangeText={text => setProduct({ ...product, amount: text })}
        value={product.amount} />
      <Button onPress={handleSave} title="Save" />

      <FlatList
        keyExtractor={item => item.id} // Käytetään id:tä avaimena
        renderItem={({ item }) =>
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>{item.title}, {item.amount}</Text>
            <Text style={{ color: '#0000ff' }} onPress={() => deleteItem(item.id)}>delete</Text>
          </View>}
        data={items} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150
  },
});