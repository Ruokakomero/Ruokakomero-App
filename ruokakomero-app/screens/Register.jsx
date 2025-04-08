import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useState } from "react";
import AuthScreen from "../configuration/AuthScreen";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import TextThemed from "../components/TextThemed";
import componentStyles from "../styles/componentStyles";
import textStyles from "../styles/textStyles";
import InputFieldComponent from "../components/InputFieldComponent";
import screensStyles from "../styles/screensStyles";
import ButtonComponent from "../components/ButtonComponent";
import { LinearGradient } from "expo-linear-gradient";

const auth = getAuth();
const database = getDatabase();

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

    //Iso kirjain
    if (!/[A-Z]/.test(password)) {
      return "Salasanan pitää sisältää vähintään yksi iso kirjain!";
    }

    // Numero
    if (!/[0-9]/.test(password)) {
      return "Salasanan pitää sisältää vähintään yksi numero!";
    }

    //Erikoismerkki
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

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Tallennetaan käyttäjä Realtime Databaseen
      await set(ref(database, `users/${user.uid}`), {
        username: username,
        email: email,
        diet: {
          vege: false,
          glutenFree: false,
          lactoseFree: false,
        },
      });

      setLoading(false);
      setEmail("");
      setPassword("");
      setUsername("");
      setPasswordError("");
      Alert.alert("Rekisteröityminen onnistui!");
    } catch (error) {
      setLoading(false);
      Alert.alert("Rekisteröityminen epäonnistui!", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={["#41381e", "#389c9a"]}
        start={{ x: 0, y: 1.5 }}
        end={{ x: 1, y: 0 }}
        style={componentStyles.gradientContainer}
      >
        <View style={screensStyles.registerContainer}>
          <TextThemed style={textStyles.titleLargeBLight}>Rekisteröidy</TextThemed>
          <InputFieldComponent
            placeholder="Käyttäjätunnus"
            value={username}
            onChangeText={setUsername}
            editable={!loading}
          />
          <InputFieldComponent
            placeholder="Sähköposti"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
            textContentType="emailAddress"
            autoComplete="email"
          />
          <InputFieldComponent
            placeholder="Salasana"
            value={password}
            onChangeText={handlePasswordChange}
            editable={!loading}
            secureTextEntry={true}
            textContentType="password"
            autoComplete="password"
            autoCapitalize="none"
          />
          
          <View style={componentStyles.buttonWrapper}> 
          {passwordError ? (
            <TextThemed style={textStyles.textDanger}>{passwordError}</TextThemed>
          ) : null}
          <TextThemed style={textStyles.bodySmallLight}>
            Salasanan pitää sisältää vähintään 8 merkkiä, yksi iso kirjain, yksi
            numero ja yksi erikoismerkki.
          </TextThemed>
          <ButtonComponent
            content={loading ? "Rekisteröidään..." : "Rekisteröidy"}
            onPress={handleRegister}
            disabled={loading}
          />
          <TextThemed style={textStyles.bodyLargeBLight} navigation={navigation}>
            Oletko jo käyttäjä? Kirjaudu sisään täältä
          </TextThemed>
          </View>
         
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
