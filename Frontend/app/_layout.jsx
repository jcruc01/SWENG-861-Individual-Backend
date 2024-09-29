import { Text, View } from "react-native";
import { Slot, Stack } from "expo-router";
import { useEffect } from "react";
import { CurrentUserProvider } from "../context/usersContext";
const RootLayout = () => {
  return (
    <CurrentUserProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </CurrentUserProvider>
  );
};

export default RootLayout;
