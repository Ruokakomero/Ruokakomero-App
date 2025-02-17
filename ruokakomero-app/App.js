import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './components/HomePage';
import AddProductsPage from './components/AddProductsPage';
import ListProducts from './components/ListProducts';
import { Ionicons } from "@expo/vector-icons";
import Recipes from './components/Recipes';
import Login from './components/Login';
import ShoppingList from './components/ShoppingList';

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
            } else if (route.name === "Ainesosat") {
              iconName = "list";
            } else if (route.name === "Lisää ainesosia") {
              iconName = "add-circle";
            } else if (route.name === "Reseptit") {
              iconName = "book";
            } else if (route.name === "Kirjaudu") {
              iconName = "log-in";
            } else if (route.name === "Ostoslista") {
              iconName = "cart";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Etusivu" component={HomePage} />
        <Tab.Screen name="Ainesosat" component={ListProducts} />
        <Tab.Screen name="Lisää ainesosia" component={AddProductsPage} />
        <Tab.Screen name="Reseptit" component={Recipes} />
        <Tab.Screen name="Kirjaudu" component={Login} /> 
        <Tab.Screen name="Ostoslista" component={ShoppingList} /> 
      </Tab.Navigator>
    </NavigationContainer>
  );
}
