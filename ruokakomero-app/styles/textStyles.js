import { StyleSheet } from "react-native";
import MainTheme from "./MainTheme";

const textStyles = StyleSheet.create({
  bodySmall: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.bodySmall,
    color: MainTheme.colors.text,
  },
  bodySmallLight: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.bodySmall,
    color: MainTheme.colors.textLight,
  },
  bodyLarge: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.text,
  },
  bodyLargeB: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.text,
  },
  textDanger: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.danger,
    fontWeight: MainTheme.fontWeights.regular,
  },
  bodyLargeBLight: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.textLight,
  },
  buttonText: {
    fontFamily: "Manrope-EB",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.textLight,
    textTransform: "uppercase",
  },
  titleLarge: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.titleLarge,
    color: MainTheme.colors.text,
    fontWeight: MainTheme.fontWeights.regular,
  },
  titleLargeB: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.titleLarge,
    color: MainTheme.colors.text,
    fontWeight: MainTheme.fontWeights.bold,
  },
  titleLargeBLight: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.titleLarge,
    color: MainTheme.colors.textLight,
  },
  titleSmall: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.text,
    fontWeight: MainTheme.fontWeights.regular,
  },
  titleSmallLight: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.textLight,
  },
  titleSmallBLight: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.textLight,
  },
  titleSmallB: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.text,
  },
  sliderLabel: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.text,
    fontWeight: MainTheme.fontWeights.regular,
    marginTop: 16,
    marginBottom: 8,
  },
  inputLabel: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.bodySmall,
    color: MainTheme.colors.text,
    fontWeight: MainTheme.fontWeights.regular,
  },
  inputLabelLight: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.bodySmall,
    color: MainTheme.colors.textLight,
    fontWeight: MainTheme.fontWeights.regular,
  },
  listHeader: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.text,
    paddingVertical: 8,
  },
  listItemText: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.bodySmall,
    color: MainTheme.colors.text,
    paddingVertical: 4,
  },
  ingredientText: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.bodySmall,
    color: MainTheme.colors.text,
    paddingVertical: 8,
  },
  recipeTitle: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.titleMedium,
    color: MainTheme.colors.text,
    paddingVertical: 16,
  },
  

});

export default textStyles;
