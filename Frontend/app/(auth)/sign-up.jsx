import { View, Text, StyleSheet, Image } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/logo.png";
import LoginForm from "../../components/loginForm";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { useUsersContext } from "../../hooks/useUsersContext";

const SignUp = () => {
  const { dispatch } = useUsersContext();
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const submit = async () => {
    if (!validateForm()) return;
    setisSubmitting(true);

    const userObj = {
      username: form.username,
      password: form.password,
      name: form.name,
    };

    try {
      const response = await fetch("http://192.168.0.204:4000/api/users", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log("Error from server:", json);
        setErrors(json.error || {});
      } else {
        console.log("New user added", json);
        setForm({
          username: "",
          password: "",
          name: "",
        });
        setErrors({});
        dispatch({ type: "CREATE_USER", payload: json });
        router.push({
          pathname: "/sign-in",
        });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const validatePassword = (password) => {
    // Regular expression to match mm/dd/yyyy format
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
        <LoginForm
          title="Name"
          placeholder="Enter Name"
          value={form.name}
          handleChangeText={(e) => setForm({ ...form, name: e })}
        />
        <LoginForm
          title="Username"
          placeholder="Create Username"
          value={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e })}
        />
        {errors.username ? (
          <Text style={styles.errors}>{errors.username}</Text>
        ) : null}
        <LoginForm
          title="Password"
          placeholder="Create Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
        />
        {errors.password ? (
          <Text style={styles.errors}>{errors.password}</Text>
        ) : null}
        <View style={styles.buttonContainer}>
          <CustomButton
            handlePress={submit}
            title="Sign Up"
            isLoading={isSubmitting}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

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
  buttonContainer: {
    margin: 44,
  },
  errors: {
    color: "red",

    padding: 5,
  },
});
