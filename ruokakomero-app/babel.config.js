module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "react-native-dotenv",
        path: ".env",
        blacklist: null,
        whitelist: ["OPENAI_API_KEY"],
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
