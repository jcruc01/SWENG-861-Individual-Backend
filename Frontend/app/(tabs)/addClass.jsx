import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { React, useState, useEffect } from "react";
import ClassForm from "../../components/classForm";
import CustomButton from "../../components/CustomButton";
import { useClassesContext } from "../../hooks/useClassesContext";
import { useUsersContext } from "../../hooks/useUsersContext";

const addClass = () => {
  const { dispatch } = useClassesContext();
  const { state } = useUsersContext();

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    classTitle: "",
    classNumber: "",
    classDescription: "",
    startDate: "",
    endDate: "",
    professorName: "",
    areaOfStudy: "",
    daysOfWeek: "",
    hoursOfDay: "",
  });

  useEffect(() => {
    const userId = state.user ? state.user._id : null;
    console.log("User ID in AddClass:", userId);
  }, [state]);

  const validateDate = (date) => {
    // Regex to match mm/dd/yyyy format
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return regex.test(date);
  };
  const validateForm = () => {
    let errors = {};

    // Validate Course Title field
    if (!form.classTitle.trim()) {
      errors.classTitle = "Course Title is required.";
    }

    // Validate course number field
    if (!form.classNumber) {
      errors.classNumber = "Course Number is required.";
    } else if (isNaN(form.classNumber)) {
      errors.classNumber = "Must input a number.";
    }

    // Validate course description field
    if (!form.classDescription.trim()) {
      errors.classDescription = "Course Description is required.";
    } else if (form.classDescription.length > 150) {
      errors.classDescription =
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
  useEffect(() => {
    const userId = state.user ? state.user._id : null;
    console.log("User ID:", userId);
  }, [state]);
  useEffect(() => {
    console.log("Current User State AddClass:", state);
  }, [state]);

  const userId = state.user ? state.user._id : null;

  const handleSubmit = async () => {
    if (validateForm() && userId) {
      console.log("Form verified");
      const classObj = {
        classTitle: form.classTitle,
        classNumber: form.classNumber,
        classDescription: form.classDescription,
        startDate: form.startDate,
        endDate: form.endDate,
        professorName: form.professorName,
        areaOfStudy: form.areaOfStudy,
        daysOfWeek: form.daysOfWeek,
        hoursOfDay: form.hoursOfDay,
        userId: userId,
      };
      console.log("Class Object to Submit:", classObj);

      try {
        const response = await fetch("http://192.168.0.204:4000/api/classes", {
          method: "POST",
          body: JSON.stringify(classObj),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const json = await response.json();

        if (!response.ok) {
          console.log("Error from server:", json);
          setErrors(json.error || {});
        } else {
          console.log("New class added", json);
          setForm({
            classTitle: "",
            classNumber: 0,
            classDescription: "",
            startDate: "",
            endDate: "",
            professorName: "",
            areaOfStudy: "",
            daysOfWeek: "",
            hoursOfDay: "",
          });
          setErrors({});
          dispatch({ type: "CREATE_CLASS", payload: json });
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Class Form</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <View>
          <ClassForm
            title="Class Title"
            value={form.classTitle}
            placeholder={"e.g: Software Construction"}
            handleChangeText={(e) => setForm({ ...form, classTitle: e })}
          ></ClassForm>
          {errors.classTitle ? (
            <Text style={styles.errors}>{errors.classTitle}</Text>
          ) : null}
          <ClassForm
            title="Class Number"
            value={form.classNumber}
            placeholder={"e.g: 861"}
            handleChangeText={(e) => setForm({ ...form, classNumber: e })}
          ></ClassForm>
          {errors.classNumber ? (
            <Text style={styles.errors}>{errors.classNumber}</Text>
          ) : null}
          <ClassForm
            title="Class Description"
            value={form.classDescription}
            placeholder={"Short description of course"}
            handleChangeText={(e) => setForm({ ...form, classDescription: e })}
          ></ClassForm>
          {errors.classDescription ? (
            <Text style={styles.errors}>{errors.classDescription}</Text>
          ) : null}
          <ClassForm
            title="Start Date"
            value={form.startDate}
            placeholder={"e.g: 08/26/2024"}
            handleChangeText={(e) => setForm({ ...form, startDate: e })}
            isDate={true}
          ></ClassForm>
          {errors.startDate ? (
            <Text style={styles.errors}>{errors.startDate}</Text>
          ) : null}
          <ClassForm
            title="End Date"
            value={form.endDate}
            placeholder={"e.g: 10/21/2024"}
            handleChangeText={(e) => setForm({ ...form, endDate: e })}
            isDate={true}
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
      <View style={styles.buttonContainer}>
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

  buttonContainer: { margin: 5 },
  errors: {
    color: "red",
    margin: 5,
  },
});
