// components/BaseModal.jsx
import React from "react";
import { Modal, View } from "react-native";
import TextThemed from "./TextThemed";
import ButtonComponent from "./ButtonComponent";
import IconButton from "./IconButton";
import styles from "../styles/recipesStyles";

export default function BaseModal({ visible, title, onClose, children, modalStyle }) {

  const getModalStyle = () => {
    switch(modalStyle) {
      case "list":
        return styles.modalContentList;
      default:
        return styles.modalContentCreate
    }
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay} >
        <View style={getModalStyle()}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 16 }}>
            {title && (
              <TextThemed style={{ fontSize: 24 }}>
                {title}
              </TextThemed>
            )}
            <IconButton iconType="close" onPress={onClose} iconColor="close" />
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
}
