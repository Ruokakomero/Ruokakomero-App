import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Login";
import Register from "../Register";

const Stack = createNativeStackNavigator();

export default function AuthStack({ handleLogin }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Kirjaudu" options={{ headerShown: false }}>
        {(props) => <Login {...props} handleLogin={handleLogin}  />}
      </Stack.Screen>
      <Stack.Screen name="Rekisteröidy" component={Register} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
