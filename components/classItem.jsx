import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const classItem = ({ className, handlePress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{className}</Text>
    </TouchableOpacity>
  );
};

export default classItem;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0c9cd4",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginTop: 69,
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
