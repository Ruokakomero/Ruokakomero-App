// Tämä komponentti siirrettiin UserInputForm.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)

import React from "react";
import { View } from "react-native";
import ButtonComponent from "../ButtonComponent";
import styles from "../../styles/userInputFormStyles";
import TextThemed from "../TextThemed";
import TabComponent from "../TabComponent";
import textStyles from "../../styles/textStyles";

const DietStep = ({
  dietOptions,
  selectedDiets,
  setSelectedDiets,
  handleNext,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <TextThemed style={textStyles.titleLargeB}>
          Valitse ruokavalio:
        </TextThemed>

        <View style={styles.optionList}>
          {dietOptions.map(({type, label}) => (
            <ButtonComponent
              key={type}
              onPress={() => {
                setSelectedDiets((prev) =>
                  prev.includes(type)
                    ? prev.filter((d) => d !== type)
                    : [...prev, type]
                );
              }}
              type={selectedDiets.includes(type) ? "enabled" : "disabled"}
              content={label}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TabComponent
          closedTab="seuraava"
          closedTabOnPress={handleNext}
          hideLeft="true"
        />
      </View>
    </View>
  );
};

export default DietStep;
