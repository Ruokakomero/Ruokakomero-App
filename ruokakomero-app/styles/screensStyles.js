// Näkymien tyylittely

import { StyleSheet } from "react-native";
import MainTheme from "./MainTheme";

const screensStyles = StyleSheet.create({
  loginView: {
    width: "100%",
    paddingHorizontal: 48,
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    flex: 1,
    padding: 24,
    alignContent: "center",
    justifyContent: "center",
  },
  registerContainer: {
    flex: 1,
    padding: 24,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default screensStyles;
