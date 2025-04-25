import { StyleSheet } from "react-native";
import MainTheme from "./MainTheme";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-around",
      paddingVertical: 16,
      backgroundColor: MainTheme.colors.textLight,
    },
    stepContainer: {
      gap: 24,
      backgroundColor: MainTheme.colors.textLight,
      padding: 24,
      justifyContent: "center",
      alignContent: "center",
    },
    optionList: {
      paddingHorizontal: 24,
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: "center",
      backgroundColor: MainTheme.colors.textLight,
      padding: 16,
      justifyContent: "center",
      alignContent: "center",
    },
    inner: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },

    header: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 15,
      color: "#333",
    },
    inputContainer: {
      width: 264,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 16,
    },
    footer: {
      justifyContent: "center",
      alignItems: "stretch",
    },
    optionButton: {
      backgroundColor: "#f8f8f8",
      padding: 15,
      marginVertical: 10,
      borderRadius: 10,
      width: "80%",
      alignItems: "center",
    },
    selectedOption: {
      backgroundColor: "#4CAF50",
    },
    slider: {
      width: "80%",
      marginVertical: 30,
    },
    button: {
      backgroundColor: "#4CAF50",
      padding: 15,
      marginTop: 20,
      borderRadius: 10,
      width: "80%",
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    textInput: {
      height: 40,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      width: "80%",
      marginTop: 10,
    },
  });

  export default styles;