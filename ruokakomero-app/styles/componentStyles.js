// uudelleenkäytettävien komponenttien tyylit 
// Erittele kommenteilla


import { StyleSheet } from "react-native";
import MainTheme from "./MainTheme";

const componentStyles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    backgroundColor: MainTheme.colors.textLight,
    padding: 24,
    alignContent: "center",
    justifyContent: "center",
  },
  gradientContainer: {
    flex: 1,
    padding: 24,
    alignContent: "center",
    justifyContent: "center",
  },
  

  scrollView: {
    paddingTop: 48,
    paddingBottom: 120,
    paddingHorizontal: 16,
    backgroundColor: MainTheme.colors.textLight,
  },
  childContainer: {
    borderRadius: 16,
    padding: 24,
    gap: 8,
    alignContent: "center",
    alignItems: "center",
  },

  buttonWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    gap: 16,
  },
  buttonContainer: {
    width: 139,
    height: 35,
    backgroundColor: MainTheme.colors.highlightBlue,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 10,
    margin: 8,
  },
  buttonText: {
    color: MainTheme.colors.textLight,
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  dangerButton: {
    backgroundColor: MainTheme.colors.danger,
  },
  defaultButton: {
    backgroundColor: MainTheme.colors.highlightBlue,
  },

  inputFieldContainer: {
    width: "100%",
    gap: 8,
    alignContent: "flex-end",
  },

  inputField: {
    backgroundColor: MainTheme.colors.inputBackground,
    borderRadius: 10,
    padding: 8,
    color: MainTheme.colors.text,
  },
  
  
});

export default componentStyles;
