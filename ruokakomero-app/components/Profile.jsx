import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

// Mockup-tiedot käyttäjästä
const initialUserData = {
  firstName: 'Maija',
  lastName: 'Mehiläinen',
  email: 'maijameh@testi.fi',
  phone: '0441231234',
  address: {
    street: 'Katu 1',
    postalCode: '00100',
    city: 'Helsinki',
  },
  password: '',
  diet: {
    vege: false,
    glutenFree: false,
    lactoseFree: false,
  },
};

export default function Profile() {
  const [user, setUser] = useState(initialUserData);

  const handleSave = () => {
    console.log('Tallennetut tiedot:', user);
  };

  const handleInputChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleAddressChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        [field]: value,
      },
    }));
  };

  const toggleDiet = (dietType) => {
    setUser((prevUser) => ({
      ...prevUser,
      diet: {
        ...prevUser.diet,
        [dietType]: !prevUser.diet[dietType],
      },
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profiilin tiedot</Text>

      <TextInput
        style={styles.input}
        placeholder="Etunimi"
        value={user.firstName}
        onChangeText={(text) => handleInputChange('firstName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sukunimi"
        value={user.lastName}
        onChangeText={(text) => handleInputChange('lastName', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Katuosoite"
        value={user.address.street}
        onChangeText={(text) => handleAddressChange('street', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Postinumero"
        value={user.address.postalCode}
        onChangeText={(text) => handleAddressChange('postalCode', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Kaupunki"
        value={user.address.city}
        onChangeText={(text) => handleAddressChange('city', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Puhelinnumero"
        value={user.phone}
        onChangeText={(text) => handleInputChange('phone', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sähköposti"
        value={user.email}
        onChangeText={(text) => handleInputChange('email', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Salasana"
        secureTextEntry
        value={user.password}
        onChangeText={(text) => handleInputChange('password', text)}
      />

      <Text style={styles.subtitle}>Ruokavalio</Text>
      <View style={styles.dietContainer}>
        <TouchableOpacity
          style={[
            styles.dietButton,
            { backgroundColor: user.diet.vege ? '#98fb98' : '#f0f0f0' },
          ]}
          onPress={() => toggleDiet('vege')}
        >
          <Text>Vege</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.dietButton,
            { backgroundColor: user.diet.glutenFree ? '#ffebcd' : '#f0f0f0' },
          ]}
          onPress={() => toggleDiet('glutenFree')}
        >
          <Text>Gluteeniton</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.dietButton,
            { backgroundColor: user.diet.lactoseFree ? '#add8e6' : '#f0f0f0' },
          ]}
          onPress={() => toggleDiet('lactoseFree')}
        >
          <Text>Maidoton</Text>
        </TouchableOpacity>
      </View>

      <Button title="Tallenna tiedot" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  dietContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dietButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
