import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './components/HomePage';
import AddProductsPage from './components/AddProductsPage';
import ListProducts from './components/ListProducts';

const Tab = createBottomTabNavigator();
  
export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name="Etusivu" component={HomePage} />
        <Tab.Screen name="Ainesosat" component={ListProducts} />
        <Tab.Screen name="Lisää ainesosia" component={AddProductsPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}