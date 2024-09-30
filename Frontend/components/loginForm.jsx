import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

const loginForm = ({
  title,
  value,
  placeholder,
  handleChangeText,
  ...props
}) => {
  const [showPassword, setShowPassoword] = useState(false);

  return (
    <View>
      <Text style={styles.userForm}>{title}</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassoword(!showPassword)}>
            {!showPassword ? (
              <AntDesign
                style={styles.eye}
                name="eye"
                size={24}
                color="black"
              />
            ) : (
              <Feather
                style={styles.eye}
                name="eye-off"
                size={24}
                color="black"
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default loginForm;

const styles = StyleSheet.create({
  userForm: {
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  inputBox: {
    borderWidth: 2,
    width: 222,
    height: 50,
    backgroundColor: "#cae4e6",
    borderRadius: 10,
    flexDirection: "row",
  },
  input: {
    flex: 1,
    color: "black",
    marginLeft: 6,
    fontSize: 17,
  },
  eye: {
    marginTop: 10,
    marginRight: 5,
    margin: -22,
  },
});
