import { StyleSheet, Text, View } from 'react-native';
import AddProduct from './AddProduct'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <AddProduct/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});