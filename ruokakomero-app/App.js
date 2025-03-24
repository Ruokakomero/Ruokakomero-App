import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomePage from './components/HomePage';
import Recipes from './components/Recipes';
import Login from './components/Login';
import Register from './components/Register';
import ShoppingList from './components/ShoppingList';
import Profile from './components/Profile';
import UserInputForm from './components/UserInputForm';
import ShowRecipes from './components/ShowRecipes';

// Create Stack Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Recipe Stack
function RecipeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Löydä resepti" component={UserInputForm} options={{ headerShown: true }} />
      <Stack.Screen name="ShowRecipes" component={ShowRecipes} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// Authentication Stack (Login + Register)
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Kirjaudu" component={Login} />
      <Stack.Screen name="Rekisteröidy" component={Register} />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Etusivu') {
            iconName = 'home';
          } else if (route.name === 'Reseptit') {
            iconName = 'book';
          } else if (route.name === 'Ostoslista') {
            iconName = 'cart';
          } else if (route.name === 'Profiili') {
            iconName = 'person';
          } else if (route.name === 'Löydä resepti') {
            iconName = 'search';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Etusivu" component={HomePage} />
      <Tab.Screen name="Löydä resepti" component={RecipeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Reseptit" component={Recipes} />
      <Tab.Screen name="Ostoslista" component={ShoppingList} />
      <Tab.Screen name="Profiili" component={Profile} />
    </Tab.Navigator>
  );
}

// App Component
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change this dynamically based on auth state

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
