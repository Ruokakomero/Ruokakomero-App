import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './components/HomePage';

const Tab = createBottomTabNavigator();
  
export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}