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

const ProteinStep = ({
  selectedProteins,
  setSelectedProteins,
  otherProtein,
  setOtherProtein,
  handleNext,
  handleBack,
  selectedDiets = {},
}) => {
  const allProteins = [
    "Kana",
    "Kala",
    "Naudanliha",
    "Possu",
    "Kasviproteiini",
    "Muu",
  ];

  // Tarkista onko käyttäjän ruokavalio kasvipohjainen
  const isPlantBased = selectedDiets.vegan || selectedDiets.vege;

  const filteredProteins = allProteins.filter((protein) => {
    if (isPlantBased) {
      return ["Kasviproteiini", "Muu"].includes(protein);
    }
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <TextThemed style={textStyles.titleLargeB}>
          Valitse proteiini:
        </TextThemed>
        <View style={styles.optionList}>
          {filteredProteins.map((protein) => (
            <ButtonComponent
              key={protein}
              onPress={() => {
                setSelectedProteins((prev) =>
                  prev.includes(protein)
                    ? prev.filter((p) => p !== protein)
                    : [...prev, protein]
                );
              }}
              type={selectedProteins.includes(protein) ? "enabled" : "disabled"}
              content={protein}
            />
          ))}
        </View>
      </View>
      {selectedProteins.includes("Muu") && (
        <View style={styles.inputContainer}>
          <InputFieldComponent
            header="Kirjoita proteiini"
            value={otherProtein}
            onChangeText={setOtherProtein}
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

export default ProteinStep;
