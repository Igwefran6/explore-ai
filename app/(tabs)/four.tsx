import React from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";

const settingsOptions = [
  { id: "1", title: "Privacy Policy" },
  { id: "2", title: "About" },
  { id: "3", title: "Change Theme" },
  { id: "4", title: "Notifications" },
  { id: "5", title: "Help" },
];

export default function TabThreeScreen() {
  const colorScheme: ColorSchemeName = useColorScheme() ?? "light";
  const handlePress = (title: any) => {
    Alert.alert(`${title} Pressed!`); // Placeholder for action when an option is pressed
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => handlePress(item.title)}
    >
      <Text style={[styles.optionText, { color: Colors[colorScheme].text }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <FlatList
        data={settingsOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f9f9f9", // Background color for the settings screen
  },
  listContainer: {
    padding: 20,
  },
  optionContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
    // color: "#333",
  },
});
