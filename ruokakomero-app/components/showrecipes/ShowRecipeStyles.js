// Tyylitiedosto ShowRecipes-komponentin refaktoroinnin yhteydessä luoduille komponenteille (Sprintti 4)
import { StyleSheet } from "react-native";
import MainTheme from "../../styles/MainTheme";
import componentStyles from "../../styles/componentStyles";
import textStyles from "../../styles/textStyles";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MainTheme.colors.textLight,
    padding: 24,
  },
  header: {
    ...textStyles.titleLargeB,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  recipeCard: {
    backgroundColor: MainTheme.colors.textLight,
    padding: 16,
    marginVertical: 8,
    borderRadius: 16,
    width: "100%",
    borderWidth: 3,
    borderColor: MainTheme.colors.dark20,
  },
  recipeTitle: {
    ...textStyles.recipeTitle,
    paddingVertical: 8,
  },
  sectionTitle: {
    ...textStyles.titleSmallB,
    marginTop: 10,
    marginBottom: 5,
  },
  ingredientText: {
    ...textStyles.ingredientText,
    paddingVertical: 4,
  },
  instructionText: {
    ...textStyles.bodySmall,
    marginBottom: 10,
  },
  sectionSpacing: {
    marginVertical: 8,
  },
  errorText: {
    ...textStyles.textDanger,
    textAlign: "center",
    marginTop: 20,
  },

  // Updated button styles to match the design system
  buttonContainer: {
    marginTop: 16,
    flexDirection: "column",
    width: "100%",
    gap: 16,
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 16,
  },
  buttonSpacing: {
    height: 10,
  },

  // Button component styles
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    padding: 8,
    borderRadius: 10,
    backgroundColor: MainTheme.colors.highlightBlue,
  },
  buttonText: {
    color: MainTheme.colors.textLight,
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  defaultButton: {
    backgroundColor: MainTheme.colors.highlightBlue,
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
  enabledButton: {
    backgroundColor: MainTheme.colors.highlightBlue,
  },
  disabledButton: {
    backgroundColor: MainTheme.colors.dark20,
  },
});

export default styles;
