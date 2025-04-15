import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import componentStyles from '../styles/componentStyles';
import { Ionicons } from "@expo/vector-icons";
import MainTheme from '../styles/MainTheme';

export default function IconButton({ onPress, iconType, iconColor, iconSize, ...props}) {


  const getIconSize = () => {
    switch (iconSize) { 
      case "small":
        return 24;
      default:
        return 48;
  }
}

  const getIconColor = () => {
    switch (iconColor) {
      case "danger":
        return MainTheme.colors.danger;
      default:
        return MainTheme.colors.highlightBlue;

    }
  }

  const getIconType = () => {
    switch (iconType) {
      case "remove":
        return "remove-circle" ;
      case "edit":
        return "create";
      case "search":
        return "search-circle";
      default:
        return "add-circle";  
  }
}
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={componentStyles.iconButton}
      >

        {iconType === "remove" ? (
          <Ionicons name={getIconType()} size={getIconSize()} color="danger" />
        ):(
          <Ionicons name={getIconType()} size={getIconSize()} color={getIconColor()} />
        )}
        
      </TouchableOpacity>
    </View>
  )
}

