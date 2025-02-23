import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Keyboard, Text, View, TouchableWithoutFeedback, TextInput } from 'react-native';

export default function App() {

  const [product, setProduct] = useState("");
  const [historys, setHistorys] = useState([]);


  const Painike = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  const addPressed = () => {
    setHistorys(prevHistorys => [...prevHistorys, { key: product }]);
  };

  const clearPressed = () => {
    setHistorys([]);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>

        <View style={styles.textInputs}>
          <TextInput
            placeholder='Lisää tuote'
            onChangeText={setProduct}
            value={product}
            style={styles.input}
          />

          <View style={styles.buttons}>
            <Painike onPress={addPressed} title="Lisää" />
            <Painike onPress={clearPressed} title="Tyhjennä" />
          </View>
        </View>

<Text> Ostoslista: </Text>
        <FlatList
          data={historys}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />

      </View>
    </TouchableWithoutFeedback>
  );
}

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
  buttonContainer: {
    backgroundColor: '#009688',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
  },
});