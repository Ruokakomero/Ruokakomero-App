import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useState } from "react";
import AuthScreen from "./AuthScreen";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    if (!email || !password || !username) {
      Alert.alert("Virhe", "Täytä kaikki kentät!");
      return;
    }

    setLoading(true);

    // Käyttää AuthScreen handleRegister 
    const result = await AuthScreen.handleRegister(email, password, username);

    setLoading(false);

    if (result.success) {

      setEmail("");
      setPassword("");
      setUsername("");

      Alert.alert("Rekisteröityminen onnistui!");

    } else {
      Alert.alert("Rekisteröityminen epäonnistui!", result.error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Rekisteröidy</Text>
        <TextInput
          style={styles.input}
          placeholder="Käyttäjätunnus"
          value={username}
          onChangeText={setUsername}
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Sähköposti"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Salasana"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />
        <Button
          title={loading ? "Rekisteröidään..." : "Rekisteröidy"}
          onPress={handleRegister}
          disabled={loading}
        />
        <Text
          style={styles.link}
          onPress={() => navigation && navigation.navigate("Login")}
        >
          Oletko jo käyttäjä? Kirjaudu sisään täältä
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  link: {
    marginTop: 10,
    color: "blue",
  },
});
