// components/BaseModal.jsx
import React from "react";
import { Modal, View } from "react-native";
import TextThemed from "./TextThemed";
import ButtonComponent from "./ButtonComponent";
import styles from "../styles/recipesStyles"; // uses your modalOverlay and modalContent styles

export default function BaseModal({ visible, title, onClose, children }) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header with a Title and a Close Button */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            {title && (
              <TextThemed style={{ fontSize: 24 /* or use your title style */ }}>
                {title}
              </TextThemed>
            )}
            <ButtonComponent content="Sulje" onPress={onClose} type="danger" />
          </View>
          {/* Render any children passed to the modal */}
          {children}
        </View>
      </View>
    </Modal>
  );
}
