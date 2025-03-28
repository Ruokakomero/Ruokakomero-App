import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth, deleteUser } from 'firebase/auth';
import { getDatabase, ref, get, set, remove } from 'firebase/database';


const auth = getAuth();
const database = getDatabase();

export default function Profile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    diet: {
      vege: false,
      glutenFree: false,
      lactoseFree: false,
    },
  });

  // Haetaan käyttäjän tiedot Realtime Database:sta
  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = ref(database, `users/${currentUser.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUser(snapshot.val());
        } else {
          console.log("Käyttäjän tietoja ei löydy.");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const userRef = ref(database, `users/${currentUser.uid}`);
        await set(userRef, user);
        Alert.alert('Tiedot tallennettu onnistuneesti!');
      } catch (error) {
        Alert.alert('Virhe tallennuksessa', error.message);
      }
    }
  };

  // Poista käyttäjän tiedot Realtime Database:sta ja Firebase Authenticationista
  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert("Virhe", "Käyttäjää ei löytynyt.");
      return;
    }

    try {
      // Poistetaan tiedot Firebase Realtime Databasesta
      const database = getDatabase();
      const userRef = ref(database, `users/${currentUser.uid}`);

      await remove(userRef); // Poistetaan käyttäjän tiedot tietokannasta
      await deleteUser(currentUser); // Poistetaan käyttäjä Firebase Authenticationista

      Alert.alert("Poisto onnistui", "Profiilisi on poistettu onnistuneesti.");
      navigation.navigate("Login"); // Palaa kirjautumissivulle poiston jälkeen
    } catch (error) {
      Alert.alert("Virhe", "Profiilin poistaminen epäonnistui: " + error.message);
    }
  };


  const handleInputChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
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
      <Button title="Poista profiili" color="red" onPress={handleDeleteAccount} />
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
