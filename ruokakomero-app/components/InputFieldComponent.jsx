import { View, Text, TextInput } from "react-native";
import React from "react";
import componentStyles from "../styles/componentStyles";
import textStyles from "../styles/textStyles";
import TextThemed from "./TextThemed";

export default function InputFieldComponent({ placeholder, styleType, value, onChangeText, header, ...props }) {


  const getInputType = () => {
    switch (styleType) {
      case "light":
        return textStyles.inputLabelLight;
      default:
        return textStyles.inputLabel;
    }
  }

  return (
    <View style={componentStyles.inputFieldContainer}>
      <TextThemed style={ getInputType() }>{header}</TextThemed>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={componentStyles.inputField}
        textStyles={textStyles.bodySmall}
        {...props}
      />
    </View>
  );
}
