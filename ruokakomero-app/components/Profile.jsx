import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth, deleteUser, signOut } from 'firebase/auth';
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
      vegan: false,
      nutAllergy: false,
      halal: false,
    },
    favoriteIngredients: '',
    dislikedIngredients: '',
  });

  // Hakee käyttäjän tiedot firebasesta
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

  // Tallentaa käyttäjän tiedot realtime databaseen
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

  // Vahvistusikkuna profiilin poistamiseen
  const confirmDeleteAccount = () => {
    Alert.alert(
      "Vahvista poistaminen",
      "Haluatko varmasti poistaa profiilisi? Tätä toimintoa ei voi perua!",
      [
        { text: "Peruuta", style: "cancel" },
        { text: "Poista", onPress: handleDeleteAccount, style: "destructive" }
      ]
    );
  };

  // Poistaa käyttäjän profiilin firebasesta
  // En saanut toimimaan uloskirjautumista poiston yhteydessä
  const handleDeleteAccount = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      Alert.alert("Virhe", "Käyttäjää ei löytynyt.");
      return;
    }

    try {
      const userRef = ref(database, `users/${currentUser.uid}`);
      await remove(userRef);
      await deleteUser(currentUser);
      Alert.alert("Poisto onnistui", "Profiilisi on poistettu onnistuneesti.");
      await signOut(auth);
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

  // Päivittää käyttäjän ruokavalion
  const toggleDiet = (dietType) => {
    setUser((prevUser) => ({
      ...prevUser,
      diet: {
        ...prevUser.diet,
        [dietType]: !prevUser.diet[dietType],
      },
    }));
  };

  // Ruokavalio vaihtoehdot
  // Näitä voi laittaa lisää jos tulee mieleen
  const dietOptions = {
    vege: "Vege",
    glutenFree: "Gluteeniton",
    lactoseFree: "Laktoositon",
    vegan: "Vegaani",
    nutAllergy: "Pähkinäallergia",
    halal: "Halal",
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
      
      <Text style={styles.subtitle}>Ruokavalio</Text>
      <View style={styles.dietContainer}>
        {Object.keys(dietOptions).map((dietType) => (
          <TouchableOpacity
            key={dietType}
            style={[
              styles.dietButton,
              { backgroundColor: user.diet[dietType] ? '#98fb98' : '#f0f0f0' },
            ]}
            onPress={() => toggleDiet(dietType)}
          >
            <Text>{dietOptions[dietType]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>Suosikkiraaka-aineet</Text>
      <TextInput
        style={styles.input}
        placeholder="Kirjoita suosikkiraaka-aineet pilkuilla erotettuna"
        value={user.favoriteIngredients}
        onChangeText={(text) => handleInputChange('favoriteIngredients', text)}
      />
      
      <Text style={styles.subtitle}>Inhokkiraaka-aineet</Text>
      <TextInput
        style={styles.input}
        placeholder="Kirjoita inhokkiraaka-aineet pilkuilla erotettuna"
        value={user.dislikedIngredients}
        onChangeText={(text) => handleInputChange('dislikedIngredients', text)}
      />

      <Button title="Tallenna tiedot" onPress={handleSave} />
      <Button title="Poista profiili" color="red" onPress={confirmDeleteAccount} />
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dietButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
    marginRight: 5,
  },
});