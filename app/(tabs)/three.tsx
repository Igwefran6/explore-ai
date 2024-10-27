import React from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed"; // Ensure you have Image component
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { ColorSchemeName } from "react-native";

const testCourses = [
  {
    id: "1",
    title: "Programming",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "2",
    title: "Data Structures and Algorithms",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "3",
    title: "Web Development",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "4",
    title: "Database Management Systems",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "5",
    title: "Artificial Intelligence",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "6",
    title: "Mobile App Development",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "7",
    title: "Software Engineering Principles",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "8",
    title: "Computer Networks",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "9",
    title: "Operating Systems",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "10",
    title: "Human-Computer Interaction",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "11",
    title: "Cloud Computing",
    image: "https://via.placeholder.com/40",
  },
  {
    id: "12",
    title: "Cybersecurity ",
    image: "https://via.placeholder.com/40",
  },
  // {
  //   id: "13",
  //   title: "Game Development",
  //   image: "https://via.placeholder.com/40",
  // },
  // {
  //   id: "14",
  //   title: "Machine Learning Basics",
  //   image: "https://via.placeholder.com/40",
  // },
  // {
  //   id: "15",
  //   title: "Data Science and Analytics",
  //   image: "https://via.placeholder.com/40",
  // },
  // {
  //   id: "16",
  //   title: "DevOps Practices",
  //   image: "https://via.placeholder.com/40",
  // },
  // {
  //   id: "17",
  //   title: "Internet of Things (IoT)",
  //   image: "https://via.placeholder.com/40",
  // },
  // {
  //   id: "18",
  //   title: "Blockchain Technology",
  //   image: "https://via.placeholder.com/40",
  // },
  // {
  //   id: "19",
  //   title: "Virtual Reality and Augmented Reality",
  //   image: "https://via.placeholder.com/40",
  // },
  // {
  //   id: "20",
  //   title: "Ethical Hacking",
  //   image: "https://via.placeholder.com/40",
  // },
];

export default function TabThreeScreen() {
  const colorScheme: ColorSchemeName = useColorScheme() ?? "light";
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => console.log(`Clicked on ${item.title}`)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
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
        data={testCourses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f9f9f9", // Adjust based on your color scheme
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc", // Adjust color based on your color scheme
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 999,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
