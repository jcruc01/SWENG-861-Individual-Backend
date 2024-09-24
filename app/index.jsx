import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../assets/logo.png";
import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View style={styles.mainView}>
          <Image source={Logo} style={styles.image} />
          <CustomButton
            title="Enter App"
            handlePress={() => router.push("/sign-in")}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#0c9cd4" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  mainView: {
    justifyContent: "center",
    paddingHorizontal: 4,
    alignItems: "center",
  },
  image: {
    width: 223,
    height: 199,
    marginTop: 190,
    marginBottom: 33,
  },
});
