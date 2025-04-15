// uudelleenkäytettävien komponenttien tyylit 


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
    flexDirection: "row",
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
  editButton: {
    backgroundColor: MainTheme.colors.highlightYellow,
  },
  defaultButton: {
    backgroundColor: MainTheme.colors.highlightBlue,
  },

  selectableListItem: {
    borderWidth: 2,
    borderColor: MainTheme.colors.dark20,
    borderRadius: 8,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  inputFieldContainer: {
    width: "100%",
    gap: 8,
    alignContent: "flex-end",
    marginVertical: 16,
  },

  inputField: {
    backgroundColor: MainTheme.colors.dark20,
    borderRadius: 16,
    padding: 16,
    color: MainTheme.colors.text,
  },
  cardContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: MainTheme.colors.dark20,

  },

  tabButtonOpen: {
    backgroundColor: MainTheme.colors.highlightBlue,
    borderRadius: 8,
    padding: 8,
    margin: 8,
  },
  tabButtonClosed: {
    backgroundColor: MainTheme.colors.blueMuted,
    borderRadius: 8,
    padding: 8,
    margin: 8,
  },
  
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  
  iconButton: {
  },
  
});

export default componentStyles;
