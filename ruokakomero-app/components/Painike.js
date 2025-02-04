import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Painike = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#009688',
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Painike;
