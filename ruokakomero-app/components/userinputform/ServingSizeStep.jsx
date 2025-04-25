// Tämä komponentti siirrettiin UserInputForm.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import styles from "../../styles/userInputFormStyles";
import MainTheme from "../../styles/MainTheme";
import InputFieldComponent from "../InputFieldComponent";
import textStyles from "../../styles/textStyles";
import TextThemed from "../TextThemed";
import TabComponent from "../TabComponent";

const ServingSizeStep = ({
  servingSize,
  setServingSize,
  handleNext,
  handleBack,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <TextThemed style={textStyles.titleLargeB}>
          Annoskoko: {servingSize} annosta
        </TextThemed>

        <Slider
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={servingSize}
          onValueChange={setServingSize}
          style={{ width: "100%", marginVertical: 30 }}
          minimumTrackTintColor={MainTheme.colors.highlightBlue}
          maximumTrackTintColor={MainTheme.colors.highlightBlue}
          thumbTintColor={MainTheme.colors.highlightBlue}
        />
      </View>

        <View
          style={styles.footer}>
          <TabComponent
            openTab="edellinen"
            closedTab="Luo resepti"
            openedTabOnPress={handleBack}
            closedTabOnPress={handleNext}
            openedTabType="disabled"
          />
        </View>
      
    </View>
  );
};

export default ServingSizeStep;
