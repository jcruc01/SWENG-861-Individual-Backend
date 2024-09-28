import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const CustomButton = ({ title, handlePress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#0c9cd4",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: 133,
    height: 44,
    borderRadius: 10,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
});
