import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import { useState } from "react";

const classForm = ({
  title,
  value,
  placeholder,
  handleChangeText,
  isDate = false,
  ...props
}) => {
  const [inputHeight, setInputHeight] = useState(40);
  const formatDate = (text) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/[^\d]/g, "");

    // Format as MM/DD/YYYY
    let formatted = cleaned;
    if (cleaned.length >= 3 && cleaned.length <= 4) {
      formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    } else if (cleaned.length >= 5) {
      formatted =
        cleaned.slice(0, 2) +
        "/" +
        cleaned.slice(2, 4) +
        "/" +
        cleaned.slice(4, 8);
    }

    // Limit input to 10 characters (MM/DD/YYYY)
    return formatted.slice(0, 10);
  };

  const handleDateInput = (text) => {
    const formattedDate = formatDate(text);
    handleChangeText(formattedDate);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <View style={[styles.inputContainer]}>
        <TextInput
          style={[styles.input]}
          multiline={true}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#888"
          onChangeText={isDate ? handleDateInput : handleChangeText}
          keyboardType={isDate ? "numeric" : "default"}
          maxLength={isDate ? 10 : undefined}
          onContentSizeChange={(event) =>
            setInputHeight(event.nativeEvent.contentSize.height)
          }
        ></TextInput>
      </View>
    </View>
  );
};

export default classForm;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
    textAlign: "left",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  input: {
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
  },
});
