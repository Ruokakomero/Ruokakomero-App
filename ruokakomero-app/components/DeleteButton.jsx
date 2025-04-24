import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import  styles  from '../constants/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DeleteButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.delButtonContainer}>
    <AntDesign name="delete" size={20} color="#8f3d3d" />
  </TouchableOpacity>
);



export default DeleteButton;
