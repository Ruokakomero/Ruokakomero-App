import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ShoppingList() {
  const [shoppingLists, setShoppingLists] = useState([
    {
      id: 'default',
      title: 'Ostoslista',
      items: []
    }
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  const currentList = shoppingLists[0];

  const openModalToAdd = () => {
    setEditingItem(null);
    setItemName('');
    setItemQuantity('');
    setModalVisible(true);
  };

  const openModalToEdit = (item) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemQuantity(item.quantity.toString());
    setModalVisible(true);
  };

  const handleSaveItem = () => {
    if (!itemName.trim() || !itemQuantity.trim()) return;


    const newItem = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      name: itemName.trim(),
      quantity: itemQuantity.trim(),
      collected: false,
    };

    const updatedItems = editingItem
      ? currentList.items.map((item) =>
          item.id === editingItem.id ? newItem : item
        )
      : [...currentList.items, newItem];

    updateListItems(updatedItems);
    setModalVisible(false);
  };

  const updateListItems = (items) => {
    setShoppingLists((prevLists) =>
      prevLists.map((list) =>
        list.id === currentList.id ? { ...list, items } : list
      )
    );
  };

  const handleToggleCollected = (itemId) => {
    const updatedItems = currentList.items.map((item) =>
      item.id === itemId ? { ...item, collected: !item.collected } : item
    );
    updateListItems(updatedItems);
  };

  const handleDeleteItem = (itemId) => {
    const updatedItems = currentList.items.filter((item) => item.id !== itemId);
    updateListItems(updatedItems);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => openModalToEdit(item)}
      onPress={() => handleToggleCollected(item.id)}
      style={[
        styles.itemContainer,
        item.collected && styles.itemCollected
      ]}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.quantityText}>{item.quantity}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
        <Ionicons name="trash" size={20} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentList.title}</Text>
      <FlatList
        data={currentList.items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Ei tuotteita</Text>}
      />

      <TouchableOpacity style={styles.addButton} onPress={openModalToAdd}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

      {/* Modal for add/edit */}
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
  itemCollected: {
    backgroundColor: '#d2f5d2',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemText: { fontSize: 18 },
  quantityText: { fontSize: 16, color: '#888' },
  empty: { textAlign: 'center', marginTop: 20, color: '#aaa' },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0a9396',
    padding: 15,
    borderRadius: 50,
    elevation: 4,
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
});
