import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";

const ClassDetails = ({ classItem }) => {
  const router = useRouter();

  return (
    <View style={styles.main}>
      <Text style={styles.dataHeader}>Class Number: </Text>
      <Text style={styles.data}>{classItem.classNumber}</Text>
      <Text style={styles.dataHeader}>Class Description: </Text>
      <Text style={styles.data}> {classItem.classDescription}</Text>
      <Text style={styles.dataHeader}>Class Start Date: </Text>
      <Text style={styles.data}>{classItem.startDate}</Text>
      <Text style={styles.dataHeader}>Class End Date:</Text>
      <Text style={styles.data}>{classItem.endDate}</Text>
      <Text style={styles.dataHeader}>Class Area of Study:</Text>
      <Text style={styles.data}>{classItem.areaOfStudy}</Text>
      <Text style={styles.dataHeader}>Class Days of Week: </Text>
      <Text style={styles.data}> {classItem.daysOfWeek}</Text>
      <Text style={styles.dataHeader}>Class Hours of Day: </Text>
      <Text style={styles.data}> {classItem.hoursOfDay}</Text>
    </View>
  );
};

export default ClassDetails;

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    backgroundColor: "#b6e0fa",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 11,
  },
  data: {
    textAlign: "center",
    margin: 11,
  },
  dataHeader: {
    textAlign: "center",
    margin: 4,
    fontWeight: "bold",
  },
});
