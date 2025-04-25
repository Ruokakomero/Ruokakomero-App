
import React from "react";
import { View } from "react-native";
import ButtonComponent from "./ButtonComponent";
import componentStyles from "../styles/componentStyles";


export default function TabComponent({ hideLeft = "false", hideRight = "false", openedTabType, openTabOnPress, closedTabType, closedTabOnPress, openTab, closedTab, ...props  }) {
  
  if (hideLeft === "true") {
    return (
      <View style={componentStyles.tabContainerRight}>
        <ButtonComponent
          content={closedTab}
          type={closedTabType}
          onPress={closedTabOnPress}
          {...props}
        />
      </View>
    );
  }

  if (hideRight === "true") {
    return (
      <View style={componentStyles.tabContainerLeft}>
        <ButtonComponent
          content={openTab}
          type={openedTabType}
          onPress={openTabOnPress}
          {...props}
        />
      </View>
    );
  }
  
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
