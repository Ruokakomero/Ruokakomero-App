// Näkymien tyylittely

import { StyleSheet } from "react-native";
import MainTheme from "./MainTheme";

const screensStyles = StyleSheet.create({

  // Stack container 

  stackContainer: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: MainTheme.colors.textLight,
  },
  
  appContainer: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 24,
    backgroundColor: MainTheme.colors.textLight,
  },




  profileContainer: {
    paddingHorizontal: 24,
    paddingVertical: 64,
    backgroundColor: MainTheme.colors.textLight
  },

  // Screen containers
  loginView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 48,
    gap: 8,
  },
  loginContainer: {
    alignContent: "center",
    justifyContent: "center",
    padding: 24,
  },
  registerContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    padding: 24,
  },
});

export default screensStyles;