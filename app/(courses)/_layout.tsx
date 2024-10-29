import React, { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";

export default function CLayout() {
  const colorScheme = useColorScheme() || "light";
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[colorScheme].tint,
        },

        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    ></Stack>
  );
}
