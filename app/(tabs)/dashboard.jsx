import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import ClassItem from "../../components/classItem";
import form from "./addClass";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard = () => {
  const { name } = useLocalSearchParams();
  const [activeSection, setActiveSection] = useState("Home");

  const getClass = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("class");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "Classes":
        return <ClassesSection />;
      default:
        return <HomeSection />;
    }
  };

  const HomeSection = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>
          Welcome to the Dashboard, {name}!
        </Text>
      </View>
      <View style={styles.featuresContainer}>
        <PressableFeatureBox
          name="View Classes"
          icon="checkbox-outline"
          onPress={() => setActiveSection("Classes")}
        />
      </View>
    </View>
  );

  const PressableFeatureBox = ({ name, icon, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.featureBox}>
      <Icon name={icon} size={50} color="#3498db" />
      <Text style={styles.featureName}>{name}</Text>
    </TouchableOpacity>
  );
  getClass();
  const ClassesSection = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => setActiveSection("Home")}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Classes Section</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>Upcoming Classes</Text>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    headerContainer: {
      backgroundColor: "#0c9cd4",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      marginTop: 24,
    },
    headerTitle: {
      fontSize: 24,
      textAlign: "center",
      fontWeight: "bold",
      color: "white",
      marginBottom: 20,
      marginTop: 4,
    },

    featuresContainer: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      marginTop: 22,
    },
    featureBox: {
      alignItems: "center",
      justifyContent: "center",
      width: "33%",
      aspectRatio: 1,
      backgroundColor: "light-gray",
      borderRadius: 10,
      marginVertical: 10,
    },
    featureName: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: "bold",
      color: "#555",
    },
    backButton: {
      margin: 3,
    },
    backButtonText: {
      color: "white",
      fontSize: 16,
      marginLeft: 11,
    },
    contentContainer: {
      //flex: 1,
      padding: 20,
    },
    contentText: {
      fontSize: 16,
      marginBottom: 10,
      color: "#555",
    },
    contentTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 10,
      textAlign: "center",
    },
    classItem: {
      backgroundColor: "#3498db",
      borderRadius: 10,
      padding: 15,
      marginVertical: 10,
    },
    classTitle: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    classDescription: {
      color: "white",
      fontSize: 14,
      marginTop: 5,
    },
  });

  return <View style={styles.container}>{renderSection()}</View>;
};

export default Dashboard;
