import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Programming() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Under Development</Text>
      <Text style={styles.message}>
        This section is currently being worked on. Please check back later!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5", // Light background color for better visibility
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#013DC4", // Tint color
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    color: "#333", // Darker text for contrast
  },
});
