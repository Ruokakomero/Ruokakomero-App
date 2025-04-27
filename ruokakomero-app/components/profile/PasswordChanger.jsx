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
    const specialCharRegex = /[^a-zA-Z0-9]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
  
    if (newPassword !== confirmPassword) {
      setError("Salasanat eivät täsmää");
    } else if (newPassword.length < 8) {
      setError("Salasanan tulee olla vähintään 8 merkkiä pitkä");
    } else if (!specialCharRegex.test(newPassword)) {
      setError("Salasanan tulee sisältää vähintään yksi erikoismerkki");
    } else if (!uppercaseRegex.test(newPassword)) {
      setError("Salasanan tulee sisältää vähintään yksi iso kirjain");
    } else if (!numberRegex.test(newPassword)) {
      setError("Salasanan tulee sisältää vähintään yksi numero");
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
        styleType="dark"
      />

      <InputFieldComponent
        header="Vahvista salasana"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        styleType="dark"
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
