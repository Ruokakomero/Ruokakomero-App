import { StyleSheet, Text, View } from 'react-native';

export default function ShoppingList() {
  return (
    <View style={styles.container}>
      <Text>Ostoslista</Text>
      <Text>Tähän tulee lista ostettavista tuotteista.</Text>
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
