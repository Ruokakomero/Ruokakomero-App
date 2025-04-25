import { View, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const auth = getAuth();
const database = getDatabase();

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Salasanan tulee olla vähintään 8 merkkiä pitkä!";
    }
    if (!/[A-Z]/.test(password)) {
      return "Salasana tulee sisältää vähintään yksi iso kirjain!";
    }
    if (!/[0-9]/.test(password)) {
      return "Salasana tulee sisältää vähintään yksi numero!";
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return "Salasana tulee sisältää vähintään yksi erikoismerkki!";
    }
    return "";
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError(validatePassword(text));
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Virhe", "Täytä kaikki kentät!");
      return;
    }

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

      // Tallennetaan käyttäjän tiedot tietokantaan
      await set(ref(database, `users/${user.uid}`), {
        email: email,
        diet: {
          vege: false,
          glutenFree: false,
          lactoseFree: false,
        },
      });

      // Merkataan että profiilin täyttö on tekemättä (eka login)
      await AsyncStorage.setItem("firstLoginDone", "false");

      // Tyhjennetään kentät ja ilmoitetaan käyttäjälle
      setEmail("");
      setPassword("");
      setPasswordError("");
      Alert.alert("Rekisteröityminen onnistui!");

      // Navigoidaan login-näkymään
      navigation.navigate("Kirjaudu");
    } catch (error) {
      setLoading(false);
      Alert.alert("Rekisteröityminen epäonnistui!", error.message);
    } finally {
      setLoading(false);
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
          <TextThemed style={textStyles.titleLargeBLight}>
            Rekisteröidy
          </TextThemed>

    
          <InputFieldComponent
            header="sähköposti"
            placeholder="Sähköposti"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
            textContentType="emailAddress"
            autoComplete="email"
            styleType="light"
          />
          <InputFieldComponent
            header="salasana"
            placeholder="Salasana"
            value={password}
            onChangeText={handlePasswordChange}
            editable={!loading}
            secureTextEntry={true}
            textContentType="password"
            autoComplete="password"
            autoCapitalize="none"
            styleType="light"
          />

          <View style={componentStyles.loginButtonWrapper}>
            {passwordError ? (
              <View style={componentStyles.errorContainer}>
                <TextThemed style={textStyles.textDangerB}>
                  {passwordError}
                </TextThemed>
              </View>
            ) : null}

            <ButtonComponent
              content={loading ? "Rekisteröidään..." : "Rekisteröidy"}
              onPress={handleRegister}
              disabled={loading}
            />
            <View style={componentStyles.textContainer}>
              <TextThemed style={textStyles.bodyLargeLight}>
                Oletko jo käyttäjä?
              </TextThemed>
              <TextThemed
                style={textStyles.linkLabel}
                onPress={() => navigation.navigate("Kirjaudu")}
              >
                Kirjaudu sisään täältä
              </TextThemed>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
