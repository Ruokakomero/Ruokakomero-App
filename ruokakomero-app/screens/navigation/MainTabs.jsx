import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomePage from "../HomePage";
import Recipes from "../Recipes";
import ShoppingList from "../ShoppingList";
import Profile from "../Profile";
import RecipeStack from "./RecipeStack";

const Tab = createBottomTabNavigator();

export default function MainTabs({ handleLogout }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Etusivu") iconName = "home";
          else if (route.name === "Reseptit") iconName = "book";
          else if (route.name === "Ostoslista") iconName = "cart";
          else if (route.name === "Profiili") iconName = "person";
          else if (route.name === "Löydä resepti") iconName = "search";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Etusivu" component={HomePage} />
      <Tab.Screen
        name="Löydä resepti"
        component={RecipeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Reseptit" component={Recipes} />
      <Tab.Screen name="Ostoslista" component={ShoppingList} />
      <Tab.Screen name="Profiili">
        {() => <Profile handleLogout={handleLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
