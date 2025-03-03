import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './components/HomePage';
import AddProductsPage from './components/AddProductsPage';
import ListProducts from './components/ListProducts';
import { Ionicons } from "@expo/vector-icons";
import Recipes from './components/Recipes';
import Login from './components/Login';
import Register from './components/Register';
import ShoppingList from './components/ShoppingList';
import Profile from './components/Profile';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Etusivu") {
              iconName = "home";
            } else if (route.name === "Reseptit") {
              iconName = "book";
            } else if (route.name === "Kirjaudu") {
              iconName = "log-in";
            } else if (route.name === "Rekisteröidy") {
              iconName = "person-add";
            } else if (route.name === "Ostoslista") {
              iconName = "cart";
            } else if (route.name === "Profiili") { // Määritä ikoni Profiilille
              iconName = "person";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Etusivu" component={HomePage} />
        <Tab.Screen name="Reseptit" component={Recipes} />
        <Tab.Screen name="Kirjaudu" component={Login} /> 
        <Tab.Screen name="Rekisteröidy" component={Register} />
        <Tab.Screen name="Ostoslista" component={ShoppingList} /> 
        <Tab.Screen name="Profiili" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
