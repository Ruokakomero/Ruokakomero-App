import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AuthScreen from "../configuration/AuthScreen";
import TextThemed from "../components/TextThemed";
import InputFieldComponent from "../components/InputFieldComponent";
import ButtonComponent from "../components/ButtonComponent";
import screensStyles from "../styles/screensStyles";
import textStyles from "../styles/textStyles";
import componentStyles from "../styles/componentStyles";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";

export default function Login({ navigation, handleLogin, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { profileName } = route.params || {};

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Syötä sähköpostiosoite ensin");
      return;
    }

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Onnistui", "Palautuslinkki lähetetty sähköpostiin.");
    } catch (error) {
      Alert.alert("Virhe", error.message);
    }
  };

  const processLogin = async () => {
    if (!email || !password) {
      Alert.alert("Virhe", "Syötä sähköposti ja salasana");
      return;
    }
  
    setLoading(true);
    const result = await AuthScreen.handleLogin(email, password);
    setLoading(false);
  
    if (result.success) {
      const auth = getAuth();
      const database = getDatabase();
      const user = auth.currentUser;
  
      if (!user) {
        Alert.alert("Virhe", "Kirjautuminen epäonnistui, yritä uudelleen.");
        return;
      }
  
      try {
        const snapshot = await get(ref(database, `users/${user.uid}/firstLoginDone`));
        if (snapshot.exists()) {
          const firstLoginDone = snapshot.val();
          console.log("FirstLoginDone data:", firstLoginDone);
  
          setEmail("");
          setPassword("");
  
          if (!firstLoginDone) {
            console.log("First login, setting tab to Profiili");
            handleLogin("Profiili");
          } else {
            console.log("Not first login, setting tab to Etusivu");
            handleLogin("Etusivu");
          }
        } else {
          console.log("FirstLoginDone tieto puuttuu, ohjataan profiiliin varmuuden vuoksi.");
          handleLogin("Profiili");
        }
      } catch (error) {
        console.error("Virhe haettaessa firstLoginDone:", error);
        Alert.alert("Virhe", "Tietojen hakeminen epäonnistui.");
      }
    } else {
      Alert.alert("Kirjautuminen epäonnistui!", result.error);
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
        <View style={screensStyles.loginContainer}>
          <TextThemed style={textStyles.titleLargeBLight}>
            Kirjaudu sisään {profileName ? `- Tervetuloa, ${profileName}!` : ""}
          </TextThemed>

          <InputFieldComponent
            placeholder="Sähköposti"
            header="sähköposti"
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
            placeholder="Salasana"
            header="salasana"
            value={password}
            onChangeText={setPassword}
            editable={!loading}
            secureTextEntry={true}
            textContentType="password"
            autoComplete="password"
            autoCapitalize="none"
            styleType="light"
          />

          <View style={componentStyles.loginButtonWrapper}>
            <ButtonComponent
              content={loading ? "Kirjaudutaan..." : "Kirjaudu"}
              onPress={processLogin}
              disabled={loading}
            />
            <ButtonComponent
              content="Unohtuiko salasana?"
              type="text"
              textStyle="light"
              onPress={handleForgotPassword}
            />

            <View style={componentStyles.textContainer}>
              <TextThemed style={textStyles.bodyLargeLight}>
                Eikö sinulla ole tiliä?
              </TextThemed>
              <TextThemed
                style={textStyles.linkLabel}
                onPress={() => navigation.navigate("Rekisteröidy")}
              >
                Rekisteröidy tästä
              </TextThemed>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
