import { StyleSheet, Text, TextInput, Button, View, Alert, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { database } from '../constants/firebaseConfig'; // Käytä omaa Firebase-konfiguraatiota
import { ref, push, onValue, remove, update } from "firebase/database";

export default function ShoppingList() {

  const [product, setProduct] = useState({
    title: '',
    amount: ''
  });
  const [items, setItems] = useState([]);
  const [editMode, setEditMode] = useState(false); // Tarkistaa, onko muokkaustilassa
  const [editId, setEditId] = useState(null); // Tallenna muokattavan tuotteen id

  const handleSave = () => {
    if (product.amount && product.title) {
      // Tallennetaan tuote ja saadaan yksilöivä avain (key)
      if (editMode) {
        // Jos ollaan muokkaustilassa, päivitetään tuote
        updateItem(editId, product);
      } else {
        // Jos ei olla muokkaustilassa, tallennetaan uusi tuote
        push(ref(database, 'items/'), product);
      }
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

  // Päivitä tuote tietokannassa
  const updateItem = (id, newProduct) => {
    const itemRef = ref(database, `items/${id}`);
    update(itemRef, newProduct)
      .then(() => {
        Alert.alert('Item updated successfully');
        setEditMode(false); // Poistetaan muokkaustila
        setEditId(null); // Nollataan muokattavan tuotteen id
        setProduct({ title: '', amount: '' }); // Tyhjennetään syöttökentät
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to update item');
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

  // Käytetään muokattavalle tuotteelle
  const handleEdit = (item) => {
    setEditMode(true);
    setEditId(item.id);
    setProduct({ title: item.title, amount: item.amount }); // Ladataan tuotteen tiedot kenttiin
  };

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
      <Button onPress={handleSave} title={editMode ? "Update" : "Save"} />

      <FlatList
        keyExtractor={item => item.id} // Käytetään id:tä avaimena
        renderItem={({ item }) =>
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>{item.title}, {item.amount}</Text>
            <Text style={{ color: '#0000ff' }} onPress={() => deleteItem(item.id)}>delete</Text>
            <Text style={{ color: '#ff0000' }} onPress={() => handleEdit(item)}>edit</Text> {/* Lisää muokkauspainike */}
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
  listcontainer: {
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '80%',
    alignItems: 'flex-start'
  }
});
