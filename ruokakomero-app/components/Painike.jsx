import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import  styles  from '../constants/styles';

const Painike = ({ onPress, title}) => (
  <TouchableOpacity onPress={onPress} style={styles.clearButton}>
    <Text style={styles.clearButtonText}>{title}</Text>
  </TouchableOpacity>
);



export default Painike;
