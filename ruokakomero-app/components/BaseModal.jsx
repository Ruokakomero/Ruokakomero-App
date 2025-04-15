// components/BaseModal.jsx
import React from "react";
import { Modal, View } from "react-native";
import TextThemed from "./TextThemed";
import ButtonComponent from "./ButtonComponent";
import styles from "../styles/recipesStyles"; 

export default function BaseModal({ visible, title, onClose, children }) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContentCreate}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            {title && (
              <TextThemed style={{ fontSize: 24  }}>
                {title}
              </TextThemed>
            )}
            <ButtonComponent content="Sulje" onPress={onClose} type="danger" />
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
}
