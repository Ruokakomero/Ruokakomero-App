// uudelleenkäytettävien komponenttien tyylit 


import { StyleSheet } from "react-native";
import MainTheme from "./MainTheme";

const componentStyles = StyleSheet.create({

  // Layout containers
  mainContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: MainTheme.colors.textLight,
  },
  gradientContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    padding: 24,
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 120,
    backgroundColor: MainTheme.colors.textLight,
  },
  childContainer: {
    alignContent: "center",
    alignItems: "center",
    padding: 24,
    borderRadius: 16,
    gap: 8,
  },
  cardContainer: {
    padding: 16,
    borderWidth: 3,
    borderColor: MainTheme.colors.dark20,
    borderRadius: 16,
  },
  

  // Button styles
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 16,
  },
  loginButtonWrapper: {
    gap: 16,
    marginTop: 16,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    padding: 8,
    margin: 8,
    borderRadius: 10,
    backgroundColor: MainTheme.colors.highlightBlue,
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
  dangerButtonMuted: {
    backgroundColor: MainTheme.colors.dangerMuted,
  },
  editButton: {
    backgroundColor: MainTheme.colors.highlightYellow,
  },
  defaultButton: {
    backgroundColor: MainTheme.colors.highlightBlue,
  },
  enabledButton: {
    backgroundColor: MainTheme.colors.highlightBlue,
  },
  disabledButton: {
    backgroundColor: MainTheme.colors.dark20,
  },

  // Input fields
  inputFieldContainer: {
    alignContent: "flex-end",
    width: "100%",
    marginVertical: 16,
    gap: 8,
  },
  inputField: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: MainTheme.colors.dark20,
    color: MainTheme.colors.text,
  },

  // Tab styles
  tabButtonOpen: {
    padding: 8,
    height: 35,
    width: 240,
    borderRadius: 8,
    backgroundColor: MainTheme.colors.highlightBlue,
  },
  tabButtonClosed: {
    height: 35,
    width: 120,
    padding: 8,
    borderRadius: 8,
    backgroundColor: MainTheme.colors.blueMuted,
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    
  },

  // Swipe actions
  swipeableContainer: {
    alignContent: "center",
    justifyContent: "center",
    width: 64,
    borderRadius: 8,
  },
  swipeableButton: {
    alignContent: "center",
    justifyContent: "center",
    width: 64,
    borderRadius: 8,
    backgroundColor: MainTheme.colors.danger,
  },

  // Other
  selectableListItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderWidth: 2,
    borderColor: MainTheme.colors.dark20,
    borderRadius: 8,
  },
  iconButton: {
  },
  

  // Profile styles

  dietContainer: {
    flexDirection:"row",
    padding: 16,
    borderRadius: 8,
    
  },
  dietSelectorContainer: {
    alignItems: "center",

  }, 
  dietSelectorWrapper: {
    marginVertical: 16,

  },
  actionsContainer: {
    padding: 16,
    backgroundColor: MainTheme.colors.dark20,
    borderRadius: 16,
  },
  section: {  

    marginVertical: 16,
    borderTopWidth: 4, 
    borderColor: MainTheme.colors.dark40,
    backgroundColor: MainTheme.colors.textLight,
  },

  // Login styles

  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: MainTheme.colors.dark40,
    borderRadius: 16,

  },
  textContainer: {
    flexDirection: "row", 
    gap: 8,
  }

});



export default componentStyles;
