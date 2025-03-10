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
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  // Salasanan vaatimukset
  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Salasanan pitää olla vähintään 8 merkkiä pitkä!";
    }

    // Iso kirjain
    if (!/[A-Z]/.test(password)) {
      return "Salasanan pitää sisältää vähintään yksi iso kirjain!";
    }

    // Numero
    if (!/[0-9]/.test(password)) {
      return "Salasanan pitää sisältää vähintään yksi numero!";
    }

    // Erikoismerkki
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return "Salasanan pitää sisältää vähintään yksi erikoismerkki!";
    }

    return "";
  };

  // Päivitys ja validointi
  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError(validatePassword(text));
  };

  const handleRegister = async () => {
    if (!email || !password || !username) {
      Alert.alert("Virhe", "Täytä kaikki kentät!");
      return;
    }

    // Salasanan tarkistus ennen rekisteröintiä
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      Alert.alert("Virhe", passwordValidationError);
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
      setPasswordError("");
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
          onChangeText={handlePasswordChange}
          secureTextEntry
          editable={!loading}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
        <Text style={styles.passwordHint}>
          Salasanan pitää sisältää vähintään 8 merkkiä, yksi iso kirjain, yksi
          numero ja yksi erikoismerkki.
        </Text>
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
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
    width: 300,
  },
  passwordHint: {
    fontSize: 12,
    color: "gray",
    marginBottom: 15,
    textAlign: "center",
    width: 300,
  },
  link: {
    marginTop: 20,
    color: "blue",
  },
});
