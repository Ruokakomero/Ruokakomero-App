import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./components/AppStack";
import AuthStack from "./components/AuthStack";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

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

  const handleLogin = async () => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem("isLoggedIn");
  };

  if (isCheckingLogin) return null;

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppStack handleLogout={handleLogout} />
      ) : (
        <AuthStack setIsLoggedIn={handleLogin} />
      )}
    </NavigationContainer>
  );
}
