import { View, Text, StyleSheet, Image } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/logo.png";
import LoginForm from "../../components/loginForm";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";

const mockUser = {
  username: "joe",
  password: "Password1!",
  name: "Joe",
};

const SignIn = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const submit = () => {
    let errors = {};
    if (validateForm()) {
      if (
        form.username === mockUser.username &&
        form.password === mockUser.password
      ) {
        setErrors({});
        router.push({
          pathname: "../(tabs)/dashboard",
          params: { name: mockUser.name },
        });
      } else if (form.password != mockUser.password) {
        errors.password = "Wrong Password";
        setErrors(errors);
      }
    }
  };
  const validatePassword = (password) => {
    // Regex to match mm/dd/yyyy format
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };
  const validateForm = () => {
    let errors = {};

    // Validate Username
    if (!form.username.trim()) {
      errors.username = "Username is required.";
    }

    // Validate Password
    if (!form.password) {
      errors.password = "Password is required.";
    } else if (!validatePassword(form.password)) {
      errors.password =
        "Must contain a number, letter, and special character. Must be at least 8 characters long";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <Image source={Logo} style={styles.image} />
        <Text style={styles.text}>Log In</Text>
        <LoginForm
          title="Username"
          placeholder="Username"
          value={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e })}
        />
        {errors.username ? (
          <Text style={styles.errors}>{errors.username}</Text>
        ) : null}
        <LoginForm
          title="Password"
          placeholder="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
        />
        {errors.password ? (
          <Text style={styles.errors}>{errors.password}</Text>
        ) : null}
        <View style={styles.button}>
          <CustomButton
            handlePress={submit}
            title="Sign In"
            isLoading={isSubmitting}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    marginTop: 105,
    width: 222,
    height: 199,
  },
  container: {
    width: 222,
  },
  text: {
    fontSize: 22,
    marginTop: 25,
    fontWeight: "bold",
  },
  button: {
    marginLeft: 44,
    marginTop: 33,
  },
  errors: {
    color: "red",
    margin: 5,
    padding: 5,
  },
});
