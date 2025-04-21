import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomePage from "../HomePage";
import Recipes from "../Recipes";
import ShoppingList from "../ShoppingList";
import Profile from "../Profile";
import RecipeStack from "./RecipeStack";
import screensStyles from "../../styles/screensStyles";

const Tab = createBottomTabNavigator();

export default function MainTabs({ handleLogout, initialTab, profileName }) {
  return (
    <Tab.Navigator
      initialRouteName={initialTab}  // Käytetään tätä, jotta aloitetaan oikealta välilehdeltä
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
      <Tab.Screen name="Etusivu" component={HomePage} options={{ headerShown: false }} />
      <Tab.Screen
        name="Löydä resepti"
        component={RecipeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Reseptit" component={Recipes} options={{ headerShown: false }}/>
      <Tab.Screen name="Ostoslista" component={ShoppingList} options={{ headerShown: false }}/>
      <Tab.Screen name="Profiili" options={{ headerShown: false }} >
        {() => (
          <Profile 
            handleLogout={handleLogout} 
            profileName="Profiili" // Lähetä nimi tänne
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
