import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AppStack from "./screens/navigation/AppStack";
import AuthStack from "./screens/navigation/AuthStack";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [initialTab, setInitialTab] = useState("Etusivu");


  async function handleLogin(tab = "Etusivu") {
    setInitialTab(tab); // Asetetaan ensin aloitusvälilehti
    await AsyncStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true); // Ja sitten siirrytään AppStackiin
  }

  async function handleLogout() {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem("isLoggedIn");
  }

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "Manrope-R": require("./assets/fonts/manrope-regular.otf"),
          "Manrope-B": require("./assets/fonts/manrope-bold.otf"),
          "Manrope-L": require("./assets/fonts/manrope-light.otf"),
          "Manrope-EB": require("./assets/fonts/manrope-extrabold.otf"),
        });
        setFontsLoaded(true);
      } catch (err) {
        console.warn("Font loading error:", err);
      }
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedStatus = await AsyncStorage.getItem("isLoggedIn");
        if (storedStatus === "true") {
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Error loading login status:", e);
      } finally {
        setIsCheckingLogin(false);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (fontsLoaded && !isCheckingLogin) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isCheckingLogin]);

  if (!fontsLoaded || isCheckingLogin) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
      {isLoggedIn ? (
        console.log("🔐 Näytetään AppStack"),
        <AppStack handleLogout={handleLogout} initialTab={initialTab} />
      ) : (
        console.log("🔓 Näytetään AuthStack"),
        <AuthStack handleLogin={handleLogin} />
      )}
    </NavigationContainer>
    </GestureHandlerRootView>
    
  );

}