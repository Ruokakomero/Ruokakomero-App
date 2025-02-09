import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './components/HomePage';
import AddProductsPage from './components/AddProductsPage';

const Tab = createBottomTabNavigator();
  
export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="AddProducts" component={AddProductsPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}