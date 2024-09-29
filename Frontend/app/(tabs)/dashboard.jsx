import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import ClassDetails from "../../components/classDetails";
import { useClassesContext } from "../../hooks/useClassesContext";
import { useUsersContext } from "../../hooks/useUsersContext";

import Logo from "../../assets/delete-symbol-option.png";
const Dashboard = () => {
  const { state } = useUsersContext();
  const [activeSection, setActiveSection] = useState("Home");
  const [selectedClass, setSelectedClass] = useState(null);
  const { classes, dispatch } = useClassesContext();
  const name = "Phil";
  useEffect(() => {
    const fetchClasses = async () => {
      const response = await fetch("http://192.168.0.204:4000/api/classes");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CLASSES", payload: json });
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const userId = state.user ? state.user._id : null;
    console.log("User ID:", userId);
  }, [state]);

  const renderSection = () => {
    switch (activeSection) {
      case "Classes":
        return <ClassesSection />;
      case "IndividualClass":
        return <IndividualClassSection classItem={selectedClass} />;
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
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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

  //get user state for delete
  const userId = state.user ? state.user._id : null;

  const handleDeletePress = async (classItem) => {
    const response = await fetch(
      `http://192.168.0.204:4000/api/classes/${classItem._id}?userId=${userId}`,
      { method: "DELETE" }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_CLASS", payload: json });
    }
  };

  const handleLogout = () => {
    dispatch({ type: "CLEAR_CURRENT_USER" });
    router.push({
      pathname: "../(auth)/sign-in",
    });
  };
  const userClasses = classes.filter(
    (classItem) => classItem.userId === userId
  );

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
      <ScrollView style={styles.scroll}>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>Upcoming Classes</Text>
          {userClasses.length > 0 ? ( // Check if userClasses has any items
            userClasses.map((classItem) => (
              <TouchableOpacity
                style={styles.classItemContainer}
                key={classItem._id}
                onPress={() => {
                  setSelectedClass(classItem); // Set selected class
                  setActiveSection("IndividualClass");
                }}
              >
                <View style={styles.classItemContent}>
                  <Text style={styles.classTitle}>{classItem.classTitle}</Text>
                  <TouchableOpacity
                    onPress={() => handleDeletePress(classItem)}
                    style={styles.deleteButton}
                  >
                    <Image source={Logo} style={styles.image} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.contentText}>No classes available.</Text> // Message if no classes are found
          )}
        </View>
      </ScrollView>
    </View>
  );

  const IndividualClassSection = ({ classItem }) => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => setActiveSection("Classes")}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{classItem.classTitle}</Text>
      </View>
      <View style={styles.contentContainer}>
        <ClassDetails classItem={classItem} />
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    headerContainer: {
      backgroundColor: "#0c9cd4",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,

      width: "100%",
      paddingTop: 40,
    },
    headerTitle: {
      fontSize: 24,
      textAlign: "center",
      fontWeight: "bold",
      color: "white",
      marginBottom: 20,
      marginTop: 4,
    },
    container: {
      flex: 1,
    },
    scroll: {
      flexGrow: 1,
      padding: 20,
    },
    featuresContainer: {
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
      marginRight: 3,
      width: 33,
      height: 33,
    },
    backButtonText: {
      color: "white",
      fontSize: 16,
      marginLeft: 11,
    },
    contentContainer: {
      flexGrow: 1,
      padding: 20,
    },
    classItemContainer: {
      padding: 15,
      marginBottom: 10,
      backgroundColor: "#f0f4f8",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ddd",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
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
      textAlign: "center",
      color: "white",
      fontSize: 20,
    },
    classItemContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    classTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
      flexShrink: 1,
    },
    classDescription: {
      color: "white",
      fontSize: 14,
      marginTop: 5,
    },
    deleteClass: {
      marginLeft: 4,
      width: 22,
      height: 22,
    },
    deleteButton: {
      marginLeft: 10,
    },
    image: {
      width: 24,
      height: 24,
    },
    logoutButton: {
      marginTop: 10,
      backgroundColor: "#e74c3c", // Red color for the logout button
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },

    logoutButtonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
  });
  useEffect(() => {
    console.log("Current User State Dashboard:", state);
  }, [state]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>{renderSection()}</View>
    </>
  );
};

export default Dashboard;
