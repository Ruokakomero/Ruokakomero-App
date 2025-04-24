import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Animated,
  Platform,
  UIManager,
} from "react-native";
import componentStyles from "../styles/componentStyles";
import textStyles from "../styles/textStyles";
import TextThemed from "./TextThemed";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function ButtonComponent({
  content,
  type = "default",
  onPress,
  textStyle,
  ...props
}) {
  const widthAnim = useRef(new Animated.Value(type === "tabOpen" ? 240 : 120)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: type === "tabOpen" ? 240 : 120,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [type]);

  const getButtonStyle = () => {
    switch (type) {
      case "danger":
        return componentStyles.dangerButton;
      case "dangerMuted":
        return componentStyles.dangerButtonMuted;
      case "tabOpen":
        return componentStyles.tabButtonOpen;
      case "tabClosed":
        return componentStyles.tabButtonClosed;
      case "edit":
        return componentStyles.editButton;
      case "enabled":
        return componentStyles.enabledButton;
      case "disabled":
        return componentStyles.disabledButton;
      default:
        return componentStyles.defaultButton;
    }
  };

  const getTextStyle = () => {
    switch (textStyle) {
      case "dark":
        return textStyles.buttonTextDark;
      default:
        return textStyles.buttonText;
    }
  };

  return (
    <TouchableOpacity
      style={[componentStyles.buttonContainer, getButtonStyle()]}
      onPress={onPress}
      {...props}
    >
      <TextThemed style={getTextStyle()}>{content}</TextThemed>
    </TouchableOpacity>
  );
}
