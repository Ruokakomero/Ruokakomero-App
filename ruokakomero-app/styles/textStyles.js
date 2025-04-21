import { StyleSheet } from "react-native";
import MainTheme from "./MainTheme";

const textStyles = StyleSheet.create({

  // Typography
  bodySmall: {
    color: MainTheme.colors.text,
    fontSize: MainTheme.fontSizes.bodySmall,
    fontFamily: "Manrope-R",
  },
  bodySmallLight: {
    color: MainTheme.colors.textLight,
    fontSize: MainTheme.fontSizes.bodySmall,
    fontFamily: "Manrope-R",
  },
  bodyLarge: {
    color: MainTheme.colors.text,
    fontSize: MainTheme.fontSizes.bodyLarge,
    fontFamily: "Manrope-R",
  },
  bodyLargeLight: {
    color: MainTheme.colors.textLight,
    fontSize: MainTheme.fontSizes.bodyLarge,
    fontFamily: "Manrope-R",
  },
  bodyLargeB: {
    color: MainTheme.colors.text,
    fontSize: MainTheme.fontSizes.bodyLarge,
    fontFamily: "Manrope-B",
  },
  textDanger: {
    color: MainTheme.colors.danger,
    fontSize: MainTheme.fontSizes.bodyLarge,
    fontWeight: MainTheme.fontWeights.regular,
    fontFamily: "Manrope-R",
  },
  textDangerB: {
    color: MainTheme.colors.danger,
    fontSize: MainTheme.fontSizes.bodyLarge,
    fontFamily: "Manrope-B",
  },
  bodyLargeBLight: {
    color: MainTheme.colors.textLight,
    fontSize: MainTheme.fontSizes.bodyLarge,
    fontFamily: "Manrope-B",
  },
  buttonText: {
    color: MainTheme.colors.textLight,
    fontSize: MainTheme.fontSizes.bodyLarge,
    fontFamily: "Manrope-EB",
    textTransform: "uppercase",
  },
  buttonTextDark: {
    color: MainTheme.colors.dark,
    fontSize: MainTheme.fontSizes.bodyLarge,
    fontFamily: "Manrope-EB",
    textTransform: "uppercase",
  },
  titleLarge: {
    color: MainTheme.colors.text,
    fontSize: MainTheme.fontSizes.titleLarge,
    fontWeight: MainTheme.fontWeights.regular,
    fontFamily: "Manrope-R",
  },
  titleLargeB: {
    color: MainTheme.colors.text,
    fontSize: MainTheme.fontSizes.titleLarge,
    fontWeight: MainTheme.fontWeights.bold,
    fontFamily: "Manrope-B",
  },
  titleLargeBLight: {
    color: MainTheme.colors.textLight,
    fontSize: MainTheme.fontSizes.titleLarge,
    fontFamily: "Manrope-B",
  },
  titleSmall: {
    color: MainTheme.colors.text,
    fontSize: MainTheme.fontSizes.titleSmall,
    fontWeight: MainTheme.fontWeights.regular,
    fontFamily: "Manrope-R",
  },
  titleSmallLight: {
    color: MainTheme.colors.textLight,
    fontSize: MainTheme.fontSizes.titleSmall,
    fontFamily: "Manrope-R",
  },
  titleSmallBLight: {
    color: MainTheme.colors.textLight,
    fontSize: MainTheme.fontSizes.titleSmall,
    fontFamily: "Manrope-B",
  },
  titleSmallB: {
    color: MainTheme.colors.text,
    fontSize: MainTheme.fontSizes.titleSmall,
    fontFamily: "Manrope-B",
  },
  sliderLabel: {
    marginTop: 16,
    marginBottom: 8,
    color: MainTheme.colors.text,
    fontSize: MainTheme.fontSizes.titleSmall,
    fontWeight: MainTheme.fontWeights.regular,
    fontFamily: "Manrope-R",
  },
  inputLabel: {
    color: MainTheme.colors.text,
    fontSize: MainTheme.fontSizes.bodySmall,
    fontWeight: MainTheme.fontWeights.regular,
    fontFamily: "Manrope-R",
  },
  inputLabelLight: {
    color: MainTheme.colors.textLight,
    fontSize: MainTheme.fontSizes.bodySmall,
    fontWeight: MainTheme.fontWeights.regular,
    fontFamily: "Manrope-R",
  },
  listHeader: {
    paddingVertical: 8,
    color: MainTheme.colors.text,
    fontSize: MainTheme.fontSizes.titleSmall,
    fontFamily: "Manrope-B",
  },
  listItemText: {
    paddingVertical: 4,
    color: MainTheme.colors.text,
    fontSize: MainTheme.fontSizes.bodySmall,
    fontFamily: "Manrope-B",
  },
  ingredientText: {
    paddingVertical: 8,
    color: MainTheme.colors.text,
    fontSize: MainTheme.fontSizes.bodySmall,
    fontFamily: "Manrope-B",
  },
  recipeTitle: {
    paddingVertical: 16,
    color: MainTheme.colors.text,
    fontSize: MainTheme.fontSizes.titleMedium,
    fontFamily: "Manrope-B",
  },  
  linkLabel: {
    color: MainTheme.colors.highlightBlue,
    fontSize: MainTheme.fontSizes.bodyLarge,
    fontFamily: "Manrope-EB",
  }
});

export default textStyles;