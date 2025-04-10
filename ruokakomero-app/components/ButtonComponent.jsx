import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import componentStyles from "../styles/componentStyles";
import textStyles from "../styles/textStyles";
import TextThemed from "./TextThemed";


export default function ButtonComponent({ content, type = "default", onPress, ...props }) {
 
  const getButtonStyle = () => {
    switch (type) {
      case "danger":
        return componentStyles.dangerButton;
      case "tabOpen":
        return componentStyles.tabButtonOpen;
      case "tabClosed":
        return componentStyles.tabButtonClosed;
      case "edit":
        return componentStyles.editButton;
      default:
        return componentStyles.defaultButton;
    }
  };

  return (
    <TouchableOpacity style={[componentStyles.buttonContainer, getButtonStyle()]} onPress={onPress} {...props}>
      <TextThemed style={textStyles.buttonText}>{content}</TextThemed>
    </TouchableOpacity>
  );
}


