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
  ...props
}) => {
  const [inputHeight, setInputHeight] = useState(40);

  return (
    <View>
      <Text style={styles.userForm}>{title}</Text>
      <View style={[styles.inputBox, { height: inputHeight }]}>
        <TextInput
          style={[styles.input, { height: inputHeight }]}
          multiline
          placeholder={placeholder}
          onChangeText={handleChangeText}
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
  userForm: {
    padding: 2,
    textAlign: "center",
    fontWeight: "bold",
  },
  inputBox: {
    height: 90,
    margin: 12,
    borderWidth: 0.5,
    padding: 1,
    backgroundColor: "#cae4e6",
    borderRadius: 10,

    multiline: true,
  },
  input: {
    color: "black",
    marginLeft: 6,
    fontSize: 17,
    textAlign: "center",
  },
  eye: {
    marginTop: 10,
    marginRight: 5,
    margin: -22,
  },
});
