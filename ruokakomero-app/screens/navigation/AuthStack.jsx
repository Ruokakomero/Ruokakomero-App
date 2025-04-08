import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Login";
import Register from "../Register";

const Stack = createNativeStackNavigator();

export default function AuthStack({ handleLogin }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Kirjaudu">
        {(props) => <Login {...props} handleLogin={handleLogin} />}
      </Stack.Screen>
      <Stack.Screen name="Rekisteröidy" component={Register} />
    </Stack.Navigator>
  );
}
