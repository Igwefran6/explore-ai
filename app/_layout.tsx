// RootLayout.js
import React, { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import LoginScreen from "@/app/(auth)/loginScreen";
import { useColorScheme } from "@/components/useColorScheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (!loaded) {
    return null;
  }

  return isAuthenticated ? (
    <RootLayoutNav />
  ) : (
    <LoginScreen onLoginSuccess={handleLoginSuccess} />
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(quickAccess)" options={{ headerShown: false }} />
        <Stack.Screen name="(courses)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", headerShown: false }}
        />
      </Stack>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </ThemeProvider>
  );
}
