import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";

const ClassDetails = ({ classItem }) => {
  const router = useRouter();

  return (
    <View style={styles.main}>
      <Text style={styles.title}>{classItem.classTitle}</Text>
      <Text style={styles.data}>Class Number: {classItem.classNumber}</Text>
      <Text style={styles.data}>
        Class Description: {classItem.classDescription}
      </Text>
      <Text style={styles.data}>Class Start Date: {classItem.startDate}</Text>
      <Text style={styles.data}>Class End Date: {classItem.endDate}</Text>
      <Text style={styles.data}>
        Class Area of Study: {classItem.areaOfStudy}
      </Text>
      <Text style={styles.data}>
        Class Days of Week: {classItem.daysOfWeek}
      </Text>
      <Text style={styles.data}>
        Class Hours of Day: {classItem.hoursOfDay}
      </Text>
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
  },
});
