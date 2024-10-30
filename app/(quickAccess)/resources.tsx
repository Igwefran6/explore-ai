import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";

const resources = [
  {
    id: "1",
    title: "W3Schools",
    description: "A comprehensive resource for web development tutorials.",
    url: "https://www.w3schools.com",
  },
  {
    id: "2",
    title: "MDN Web Docs",
    description:
      "Mozilla's documentation for HTML, CSS, JavaScript, and web APIs.",
    url: "https://developer.mozilla.org",
  },
  {
    id: "3",
    title: "freeCodeCamp",
    description:
      "Learn to code for free with thousands of coding lessons and projects.",
    url: "https://www.freecodecamp.org",
  },
  {
    id: "4",
    title: "Coursera",
    description:
      "Online courses on computer science and programming from top universities.",
    url: "https://www.coursera.org",
  },
  {
    id: "5",
    title: "GeeksforGeeks",
    description:
      "Resources and tutorials on data structures, algorithms, and coding.",
    url: "https://www.geeksforgeeks.org",
  },
];

export default function ResourceScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || "light"];

  const openURL = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.itemBackground }]}
      onPress={() => openURL(item.url)}
    >
      <Text style={[styles.title, { color: colors.tint }]}>{item.title}</Text>
      <Text style={[styles.description, { color: colors.text }]}>
        {item.description}
      </Text>
      <Text style={[styles.url]}>Learn more</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.tint }]}>
        Popular Resources
      </Text>
      <FlatList
        data={resources}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  url: {
    fontSize: 14,
    fontWeight: "bold",
    color: "dodgerblue",
  },
});
