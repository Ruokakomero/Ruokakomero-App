// components/TabComponent.jsx

import React from "react";
import { View, TouchableOpacity } from "react-native";
import ButtonComponent from "./ButtonComponent";
import componentStyles from "../styles/componentStyles";

export default function TabComponent({ openedTabType, openTabOnPress, closedTabType, closedTabOnPress, openTab, closedTab, ...props  }) {
  return (
    <View style={componentStyles.tabContainer}>
      <ButtonComponent
        content={openTab}
        type={openedTabType}
        onPress={openTabOnPress}
        {...props}
      />

      <ButtonComponent
        content={closedTab}
        type={closedTabType}
        onPress={closedTabOnPress}
        {...props}
      />
    </View>
  );
}
