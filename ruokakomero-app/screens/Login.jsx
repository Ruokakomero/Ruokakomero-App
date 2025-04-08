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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation, handleLogin, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { profileName } = route.params || {};

  const processLogin = async () => {
    if (!email || !password) {
      Alert.alert("Virhe", "Syötä sähköposti ja salasana");
      return;
    }

    setLoading(true);
    const result = await AuthScreen.handleLogin(email, password);
    setLoading(false);

    if (result.success) {
      const isFirstLogin = await AsyncStorage.getItem("firstLoginDone");

      setEmail("");
      setPassword("");

      if (isFirstLogin !== "true") {
        await AsyncStorage.setItem("firstLoginDone", "true");
        console.log("First login, setting tab to Profiili");
        handleLogin("Profiili"); // Tämä on nyt App.js:stä tuleva funktio
      } else {
        console.log("Not first login, setting tab to Etusivu");
        handleLogin("Etusivu");
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
          />

          <View style={componentStyles.buttonWrapper}>
          <ButtonComponent
  content={loading ? "Kirjaudutaan..." : "Kirjaudu"}
  onPress={processLogin}
  disabled={loading}
/>

            <TextThemed
              style={textStyles.titleSmallBLight}
              onPress={() => navigation.navigate("Rekisteröidy")}
            >
              Eikö sinulla ole tiliä? Rekisteröidy tästä
            </TextThemed>
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
