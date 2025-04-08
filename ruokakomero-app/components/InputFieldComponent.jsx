import { View, Text, TextInput } from "react-native";
import React from "react";
import componentStyles from "../styles/componentStyles";
import textStyles from "../styles/textStyles";
import TextThemed from "./TextThemed";

export default function InputFieldComponent({ placeholder, styleType, value, onChangeText, header, ...props }) {


  const getInputType = () => {
    switch (styleType) {
      case "dark":
        return textStyles.inputHeaderDark;
      default:
        return textStyles.inputHeader;
    }
  }

  return (
    <View style={componentStyles.inputFieldContainer}>
      <TextThemed style={[textStyles.bodyLarge, getInputType() ]}>{header}</TextThemed>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={componentStyles.inputField}
        {...props}
      />
    </View>
  );
}
