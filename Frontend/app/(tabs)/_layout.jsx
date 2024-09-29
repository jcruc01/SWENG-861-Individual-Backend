import { Tabs, Redirect } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { ClassesContextProvider } from "../../context/classesContext";
const TabsLayout = () => {
  return (
    <ClassesContextProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#black",
          tabBarInactiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#0c9cd4",
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="addClass"
          options={{
            title: "Add Class",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Entypo name="book" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </ClassesContextProvider>
  );
};

export default TabsLayout;
