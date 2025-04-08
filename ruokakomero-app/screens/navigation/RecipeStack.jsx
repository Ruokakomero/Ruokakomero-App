import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserInputForm from '../UserInputForm';
import ShowRecipes from '../ShowRecipes';

export default function RecipeStack() {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen name="Löydä resepti" component={UserInputForm} options={{ headerShown: true }} />
        <Stack.Screen name="ShowRecipes" component={ShowRecipes} options={{ headerShown: false }} />
      </Stack.Navigator>
    );

}