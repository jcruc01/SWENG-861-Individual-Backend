import { View, Text, StyleSheet, ScrollView } from "react-native";
import { React, useState, useEffect } from "react";
import ClassForm from "../../components/classForm";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

const addClass = () => {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    courseTitle: "",
    courseNumber: 0,
    courseDescription: "",
    startDate: "",
    endDate: "",
    professorName: "",
    areaOfStudy: "",
    daysOfWeek: "",
    hoursOfDay: "",
  });
  const validateDate = (date) => {
    // Regex to match mm/dd/yyyy format
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return regex.test(date);
  };
  const validateForm = () => {
    let errors = {};

    // Validate Course Title field
    if (!form.courseTitle.trim()) {
      errors.courseTitle = "Course Title is required.";
    }

    // Validate course number field
    if (!form.courseNumber) {
      errors.courseNumber = "Course Number is required.";
    } else if (isNaN(form.courseNumber)) {
      errors.courseNumber = "Must input a number.";
    }

    // Validate course description field
    if (!form.courseDescription.trim()) {
      errors.courseDescription = "Course Description is required.";
    } else if (form.courseDescription.length > 150) {
      errors.courseDescription =
        "Course Description must be less than 150 characters.";
    }
    // Validate start date field
    if (!form.startDate) {
      errors.startDate = "Start Date is required.";
    } else if (!validateDate(form.startDate)) {
      errors.startDate = "Date must be formatted MM/DD/YYYY.";
    }
    // Validate end date field
    if (!form.endDate) {
      errors.endDate = "Start Date is required.";
    } else if (!validateDate(form.endDate)) {
      errors.endDate = "Date must be formatted MM/DD/YYYY.";
    }
    // Validate professor name field
    if (!form.professorName) {
      errors.professorName = "Professor name is required.";
    }
    // Validate area of study field
    if (!form.areaOfStudy) {
      errors.areaOfStudy = "Area of study is required.";
    }
    // Validate days of week field
    if (!form.daysOfWeek) {
      errors.daysOfWeek = "Days of week class falls on is required.";
    } else if (!isNaN(form.daysOfWeek)) {
      errors.daysOfWeek = "Please do not enter numbers.";
    }
    // Validate hours of day field
    if (!form.hoursOfDay) {
      errors.hoursOfDay = "Number of hours a day for classtime is required.";
    } else if (isNaN(form.hoursOfDay)) {
      errors.hoursOfDay = "Please enter a number.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.warn("Submitted");
      setForm({
        courseTitle: "",
        courseNumber: 0,
        courseDescription: "",
        startDate: "",
        endDate: "",
        professorName: "",
        areaOfStudy: "",
        daysOfWeek: "",
        hoursOfDay: "",
      });
      setErrors({});
    }
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Class Form</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <View>
          <ClassForm
            title="Course Title"
            value={form.courseTitle}
            placeholder={"e.g: Software Construction"}
            handleChangeText={(e) => setForm({ ...form, courseTitle: e })}
          ></ClassForm>
          {errors.courseTitle ? (
            <Text style={styles.errors}>{errors.courseTitle}</Text>
          ) : null}
          <ClassForm
            title="Course Number"
            value={form.courseNumber}
            placeholder={"e.g: 861"}
            handleChangeText={(e) => setForm({ ...form, courseNumber: e })}
          ></ClassForm>
          {errors.courseNumber ? (
            <Text style={styles.errors}>{errors.courseNumber}</Text>
          ) : null}
          <ClassForm
            title="Course Description"
            value={form.courseDescription}
            placeholder={"Short description of course"}
            handleChangeText={(e) => setForm({ ...form, courseDescription: e })}
          ></ClassForm>
          {errors.courseDescription ? (
            <Text style={styles.errors}>{errors.courseDescription}</Text>
          ) : null}
          <ClassForm
            title="Start Date"
            value={form.startDate}
            placeholder={"e.g: 08/26/2024"}
            handleChangeText={(e) => setForm({ ...form, startDate: e })}
          ></ClassForm>
          {errors.startDate ? (
            <Text style={styles.errors}>{errors.startDate}</Text>
          ) : null}
          <ClassForm
            title="End Date"
            value={form.endDate}
            placeholder={"e.g: 10/21/2024"}
            handleChangeText={(e) => setForm({ ...form, endDate: e })}
          ></ClassForm>
          {errors.endDate ? (
            <Text style={styles.errors}>{errors.endDate}</Text>
          ) : null}
          <ClassForm
            title="Professor Name"
            value={form.professorName}
            placeholder={"e.g: Professor Nalubandhu"}
            handleChangeText={(e) => setForm({ ...form, professorName: e })}
          ></ClassForm>
          {errors.professorName ? (
            <Text style={styles.errors}>{errors.professorName}</Text>
          ) : null}
          <ClassForm
            title="Area of Study"
            value={form.areaOfStudy}
            placeholder={"e.g: Software Engineering"}
            handleChangeText={(e) => setForm({ ...form, areaOfStudy: e })}
          ></ClassForm>
          {errors.areaOfStudy ? (
            <Text style={styles.errors}>{errors.areaOfStudy}</Text>
          ) : null}
          <ClassForm
            title="Days of Week"
            value={form.daysOfWeek}
            placeholder={"e.g: MTWHF"}
            handleChangeText={(e) => setForm({ ...form, daysOfWeek: e })}
          ></ClassForm>
          {errors.daysOfWeek ? (
            <Text style={styles.errors}>{errors.daysOfWeek}</Text>
          ) : null}
          <ClassForm
            title="Hours of Day"
            placeholder={"e.g: 2"}
            value={form.hoursOfDay}
            handleChangeText={(e) => setForm({ ...form, hoursOfDay: e })}
          ></ClassForm>
          {errors.hoursOfDay ? (
            <Text style={styles.errors}>{errors.hoursOfDay}</Text>
          ) : null}
        </View>
      </ScrollView>
      <View style={styles.button}>
        <CustomButton title={"Submit Form"} handlePress={handleSubmit} />
      </View>
    </>
  );
};

export default addClass;

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

  button: {
    height: 33,
    marginLeft: 144,
    marginBottom: 30,
    marginTop: 11,
    justifyContent: "center",
  },
  errors: {
    color: "red",
    margin: 5,
  },
});
