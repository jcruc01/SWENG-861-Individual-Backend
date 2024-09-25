import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const CustomButton = ({ title, handlePress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0c9cd4",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginTop: 1,
    width: 133,
    height: 44,
    borderRadius: 10,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 22,
  },
});
