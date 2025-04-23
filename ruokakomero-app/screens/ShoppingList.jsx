import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { database } from '../configuration/firebaseConfig';
import { ref, push, onValue, remove, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export default function ShoppingList() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  const userItemsRef = user ? ref(database, `users/${user.uid}/Ostoslista`) : null;

  useEffect(() => {
    if (!user) return;
    const itemsRef = ref(database, `users/${user.uid}/Ostoslista`);
    const unsubscribe = onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedItems = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setItems(loadedItems);
      } else {
        setItems([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const openModalToAdd = () => {
    setEditingItem(null);
    setItemName('');
    setItemQuantity('');
    setModalVisible(true);
  };

  const openModalToEdit = (item) => {
    setEditingItem(item);
    setItemName(item.title);
    setItemQuantity(item.amount);
    setModalVisible(true);
  };

  const handleSaveItem = () => {
    if (!user) {
      Alert.alert('Virhe', 'Käyttäjää ei tunnistettu');
      return;
    }

    if (!itemName.trim() || !itemQuantity.trim()) {
      Alert.alert('Virhe', 'Täytä molemmat kentät');
      return;
    }

    const product = {
      title: itemName.trim(),
      amount: itemQuantity.trim(),
      picked: false,
    };

    if (editingItem) {
      const itemRef = ref(database, `users/${user.uid}/Ostoslista/${editingItem.id}`);
      update(itemRef, product)
        .then(() => Alert.alert('Tuote päivitetty'))
        .catch(() => Alert.alert('Virhe', 'Tuotteen päivitys epäonnistui'));
    } else {
      push(userItemsRef, product)
        .catch(() => Alert.alert('Virhe', 'Tuotteen lisäys epäonnistui'));
    }

    setModalVisible(false);
  };

  const toggleItemPicked = (item) => {
    const itemRef = ref(database, `users/${user.uid}/Ostoslista/${item.id}`);
    update(itemRef, { picked: !item.picked }).catch(() =>
      Alert.alert('Virhe', 'Valinta epäonnistui')
    );
  };
  

  const handleDeleteItem = (itemId) => {
    const itemRef = ref(database, `users/${user.uid}/Ostoslista/${itemId}`);
    remove(itemRef)
      .then(() => Alert.alert('Tuote poistettu'))
      .catch(() => Alert.alert('Virhe', 'Poisto epäonnistui'));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => toggleItemPicked(item)}
      onLongPress={() => openModalToEdit(item)}
      style={[
        styles.itemContainer,
        item.picked && styles.itemPickedContainer,
      ]}
    >
      <View style={styles.itemContent}>
        <Ionicons
          name={item.picked ? 'checkbox' : 'square-outline'}
          style={styles.checkbox}
          size={24}
          color={item.picked ? '#0a9396' : '#aaa'}
        />
        <View style={styles.textRow}>
          <Text style={[styles.itemText, item.picked && styles.pickedText]}>
            {item.title}
          </Text>
          <Text style={[styles.quantityText, item.picked && styles.pickedText]}>
            {item.amount}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
        <Ionicons name="trash" size={20} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ostoslista</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Ei tuotteita</Text>}
        ListFooterComponent={
          <TouchableOpacity style={styles.listAddButton} onPress={openModalToAdd}>
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingItem ? 'Muokkaa tuotetta' : 'Lisää tuote'}
            </Text>
            <TextInput
              placeholder="Tuotteen nimi"
              value={itemName}
              onChangeText={setItemName}
              style={styles.input}
            />
            <TextInput
              placeholder="Määrä"
              value={itemQuantity}
              onChangeText={setItemQuantity}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <Pressable onPress={() => setModalVisible(false)} style={styles.cancel}>
                <Text style={styles.buttonText}>Peruuta</Text>
              </Pressable>
              <Pressable onPress={handleSaveItem} style={styles.confirm}>
                <Text style={styles.buttonText}>Tallenna</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemText: { fontSize: 18 },
  quantityText: { fontSize: 16, color: '#888' },
  empty: { textAlign: 'center', marginTop: 20, color: '#aaa' },
  listAddButton: {
    backgroundColor: '#0a9396',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 12,
    paddingVertical: 6,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancel: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirm: {
    backgroundColor: '#0a9396',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  checkbox: {
    marginRight: 10,
  },
  
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  
  pickedText: {
    color: '#888',
  },
  
  itemPickedContainer: {
    backgroundColor: '#d8f3dc',
  },
  
  
});
