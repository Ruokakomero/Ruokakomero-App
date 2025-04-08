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
    fontWeight: MainTheme.fontWeights.regular,
  },
  bodyLargeB: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.text,
    fontWeight: MainTheme.fontWeights.regular,
  },
  textDanger: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.danger,
    fontWeight: MainTheme.fontWeights.regular,
  },
  bodyLargeBLight: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.textLight,
    fontWeight: MainTheme.fontWeights.regular,
  },
  buttonText: {
    fontFamily: "Manrope-B",
    fontSize: MainTheme.fontSizes.bodyLarge,
    color: MainTheme.colors.textLight,
    fontWeight: MainTheme.fontWeights.bold,
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
    fontWeight: MainTheme.fontWeights.bold,
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
    fontWeight: MainTheme.fontWeights.regular,
  },
  titleSmallBLight: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.textLight,
    fontWeight: MainTheme.fontWeights.bold,
  },
  titleSmallB: {
    fontFamily: "Manrope-R",
    fontSize: MainTheme.fontSizes.titleSmall,
    color: MainTheme.colors.text,
    fontWeight: MainTheme.fontWeights.bold,
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
});

export default textStyles;
