import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";

const Stack = createNativeStackNavigator();

export default function AppStack({ handleLogout, initialTab }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" options={{ headerShown: false }}>
        {() => <MainTabs handleLogout={handleLogout} initialTab={initialTab} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
