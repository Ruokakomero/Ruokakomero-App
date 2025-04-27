import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import AppStack from "./screens/navigation/AppStack";
import AuthStack from "./screens/navigation/AuthStack";
import useCurrentUser from "./configuration/useCurrentUser";
import screensStyles from "./styles/screensStyles";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { user, loading: authLoading } = useCurrentUser();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [initialTab, setInitialTab] = useState("Reseptit"); // <- Lisää tämä

  const handleLogin = (tabName) => {
    setInitialTab(tabName);
  };

  useEffect(() => {
    Font.loadAsync({
      "Manrope-R": require("./assets/fonts/manrope-regular.otf"),
      "Manrope-B": require("./assets/fonts/manrope-bold.otf"),
      "Manrope-L": require("./assets/fonts/manrope-light.otf"),
      "Manrope-EB": require("./assets/fonts/manrope-extrabold.otf"),
    })
      .then(() => setFontsLoaded(true))
      .catch((err) => console.warn("Font loading error:", err));
  }, []);

  useEffect(() => {
    if (fontsLoaded && !authLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, authLoading]);

  if (!fontsLoaded || authLoading) {
    return null;
  }

  return (
    <GestureHandlerRootView style={screensStyles.stackContainer}>
      <NavigationContainer>
        {user ? (
          <AppStack initialTab={initialTab} />  
        ) : (
          <AuthStack handleLogin={handleLogin} />  
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
