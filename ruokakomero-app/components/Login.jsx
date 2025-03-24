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

export default function Login({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Virhe", "Syötä sähköposti ja salasana");
      return;
    }

    setLoading(true);
    const result = await AuthScreen.handleLogin(email, password);
    setLoading(false);

    if (result.success) {
      setEmail("");
      setPassword("");
      Alert.alert("Kirjautuminen onnistui!");

      // Update state to switch to MainTabs
      setIsLoggedIn(true);

    } else {
      Alert.alert("Kirjautuminen epäonnistui!", result.error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Kirjaudu sisään</Text>
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
          title={loading ? "Kirjaudutaan..." : "Kirjaudu"}
          onPress={handleLogin}
          disabled={loading}
        />
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Rekisteröidy")}
        >
          Eikö sinulla ole tiliä? Rekisteröidy tästä
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
    borderRadius: 5,
    padding: 10,
  },
  link: {
    marginTop: 10,
    color: "blue",
  },
});
