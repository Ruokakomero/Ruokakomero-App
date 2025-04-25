// Tämä komponentti siirrettiin UserInputForm.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)

import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import ButtonComponent from "../ButtonComponent";
import styles from "../../styles/userInputFormStyles";
import MainTheme from "../../styles/MainTheme";
import InputFieldComponent from "../InputFieldComponent";
import textStyles from "../../styles/textStyles";
import TextThemed from "../TextThemed";
import TabComponent from "../TabComponent";

const CarbStep = ({
  selectedCarbs,
  setSelectedCarbs,
  otherCarb,
  setOtherCarb,
  handleNext,
  handleBack,
}) => {
  const carbs = ["Riisi", "Peruna", "Pasta", "Muu"];

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <TextThemed style={textStyles.titleLargeB}>
          Valitse hiilihydraatti:
        </TextThemed>
        <View style={styles.optionList}>
          {carbs.map((carb) => (
            <ButtonComponent
              key={carb}
              onPress={() => {
                setSelectedCarbs((prev) =>
                  prev.includes(carb)
                    ? prev.filter((c) => c !== carb)
                    : [...prev, carb]
                );
              }}
              type={selectedCarbs.includes(carb) ? "enabled" : "disabled"}
              content={carb}
            />
          ))}
        </View>
      </View>

      {selectedCarbs.includes("Muu") && (
        <View style={styles.inputContainer}>
          <InputFieldComponent
            header="Kirjoita hiilihydraatti"
            value={otherCarb}
            onChangeText={setOtherCarb}
            returnKeyType="done"
          />
        </View>
      )}
      <View style={styles.footer}>
        <TabComponent
          openTab="edellinen"
          closedTab="seuraava"
          openTabOnPress={handleBack}
          closedTabOnPress={handleNext}
          openedTabType="disabled"
        />
      </View>
    </View>
  );
};

export default CarbStep;
