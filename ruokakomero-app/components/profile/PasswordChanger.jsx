import React, { useState } from "react";
import { View } from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
import InputFieldComponent from "../../components/InputFieldComponent";
import TextThemed from "../../components/TextThemed";
import componentStyles from "../../styles/componentStyles";
import textStyles from "../../styles/textStyles";

export default function PasswordChanger({
  newPassword,
  setNewPassword,
  handlePasswordChange,
  ...props
}) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSavePress = () => {
    if (newPassword !== confirmPassword) {
      setError("Salasanat eivät täsmää");
    } else if (newPassword.length < 6) {
      setError("Salasanan tulee olla vähintään 6 merkkiä pitkä");
    } else {
      setError("");
      handlePasswordChange();
    }
  };

  return (
    <View style={componentStyles.section}>
      <InputFieldComponent
        header="Uusi salasana"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        styleType="light"
      />

      <InputFieldComponent
        header="Vahvista salasana"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        styleType="light"
      />

      {error !== "" && (
        <TextThemed style={textStyles.errorText}>{error}</TextThemed>
      )}

      <ButtonComponent
        type="edit"
        content="Vaihda salasana"
        onPress={handleSavePress}
        textStyle="dark"
      />
    </View>
  );
}
