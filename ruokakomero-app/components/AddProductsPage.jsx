import { StyleSheet, Text, View } from 'react-native';
import AddProduct from './AddProduct'


/*POISTETAANKO?*/
export default function AddProductsPage() {
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