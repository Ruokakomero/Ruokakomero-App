import { StyleSheet, Text, TextInput, Button, View, Alert, FlatList, TouchableOpacity } from 'react-native';
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
        style={styles.input}
        placeholder='Product title'
        onChangeText={text => setProduct({ ...product, title: text })}
        value={product.title} />
      <TextInput
        style={styles.input}
        placeholder='Amount'
        onChangeText={text => setProduct({ ...product, amount: text })}
        value={product.amount} />
      <Button 
        onPress={handleSave} 
        title={editMode ? "Update" : "Save"} 
        color="#4CAF50" 
      />

      <FlatList
        keyExtractor={item => item.id} // Käytetään id:tä avaimena
        renderItem={({ item }) =>
          <View style={styles.listcontainer}>
            <Text style={styles.itemText}>{item.title}, {item.amount}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>}
        data={items} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
    paddingHorizontal: 20
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  listcontainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
  },
  itemText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  editButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
