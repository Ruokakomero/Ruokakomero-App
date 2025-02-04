import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default function App() {

  const [ainesosa, setAinesosa] = useState("");

  const lisaaPressed = () => {
   
  } 

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Ainesosat </Text>

      <View style={styles.textInputs}>
        <TextInput
          placeholder='Lisää ainesosa'
          onChangeText={ainesosa => setAinesosa(ainesosa)}
          inputMode='numeric'
          value={ainesosa} style={styles.input} />

      </View>

      <View style={styles.buttons}>
        <Button onPress={lisaaPressed} title="Lisää" backgroundColor="#007bff" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
    borderColoer: '#000',
    borderWidth: 0.5,
    marginBottom: 10,
    padding: 8,
    width: 200
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
    paddingVertical: 10
  },
  buttonText: {
    color: '#fff'
  }
});