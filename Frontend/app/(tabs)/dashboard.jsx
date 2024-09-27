import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ClassDetails from "../../components/classDetails";
import { useClassesContext } from "../../hooks/useClassesContext";

const Dashboard = () => {
  const { name } = useLocalSearchParams();
  const [activeSection, setActiveSection] = useState("Home");
  const [selectedClass, setSelectedClass] = useState(null);
  const { classes, dispatch } = useClassesContext();

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
          {classes &&
            classes.map((classItem) => (
              <TouchableOpacity
                key={classItem._id}
                onPress={() => {
                  setSelectedClass(classItem); // Set selected class
                  setActiveSection("IndividualClass");
                }}
              >
                <Text key={classItem._id} style={styles.classItem}>
                  {classItem.classTitle}
                </Text>
              </TouchableOpacity>
            ))}
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
