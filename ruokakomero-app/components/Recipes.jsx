import { StyleSheet, Text, View } from 'react-native';

export default function Recipies() {
  return (
    <View style={styles.container}>
      <Text> Tänne listataan reseptit</Text>
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