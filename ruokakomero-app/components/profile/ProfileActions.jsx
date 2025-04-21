// Tämä komponentti siirrettiin Profile.jsx:stä refaktoroinnin yhteydessä (Sprintti 4)
import React from "react";
import { View } from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
import componentStyles from "../../styles/componentStyles";

export default function ProfileActions({
  handleSave,
  confirmDeleteAccount,
  handleLogout, ...props
}) {
  return (
    <View style={componentStyles.actionsContainer}> 
      <View style={componentStyles.buttonWrapper}>
        <ButtonComponent content="Tallenna tiedot" onPress={handleSave} />
        <ButtonComponent
          content="Poista profiili"
          onPress={confirmDeleteAccount}
          type="dangerMuted"
        />
      </View>

      <View>
        <ButtonComponent
          content="kirjaudu ulos"
          onPress={handleLogout}
          type="danger"
        />
      </View>
    </View>
  );
}
