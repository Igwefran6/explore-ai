import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import React from "react";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider style={{ paddingTop: insets.top }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: useClientOnlyValue(false, true),
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background, // Set header background color
          },
          headerTintColor: Colors[colorScheme ?? "light"].text, // Set header text/icon color
          tabBarStyle: {
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            marginBottom: 10,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            headerRight: () => (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: "AI tutor",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="commenting" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="three"
          options={{
            title: "Test",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="gears" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="four"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
