import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomePage from './components/HomePage';
import Recipes from './components/Recipes';
import Login from './components/Login';
import Register from './components/Register';
import ShoppingList from './components/ShoppingList';
import Profile from './components/Profile';
import UserInputForm from './components/UserInputForm';
import ShowRecipes from './components/ShowRecipes';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigatorin määrittäminen
function RecipeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Löydä resepti" 
        component={UserInputForm} 
        options={{ headerShown: true }} // Otsikko näkyy vain Stackissa
      />
      <Stack.Screen 
        name="ShowRecipes" 
        component={ShowRecipes}
        options={{ headerShown: false }} // Piilotetaan ShowRecipes-näkymän otsikko
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Etusivu') {
              iconName = 'home';
            } else if (route.name === 'Reseptit') {
              iconName = 'book';
            } else if (route.name === 'Kirjaudu') {
              iconName = 'log-in';
            } else if (route.name === 'Rekisteröidy') {
              iconName = 'person-add';
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
        <Tab.Screen 
          name="Löydä resepti" 
          component={RecipeStack} 
          options={{ headerShown: false }} // Piilotetaan otsikko Tab-näkymässä
        />
        <Tab.Screen name="Reseptit" component={Recipes} />
        <Tab.Screen name="Kirjaudu" component={Login} />
        <Tab.Screen name="Rekisteröidy" component={Register} />
        <Tab.Screen name="Ostoslista" component={ShoppingList} />
        <Tab.Screen name="Profiili" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
