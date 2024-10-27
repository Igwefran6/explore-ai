import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  ViewStyle,
  ImageStyle,
  TextStyle,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { ColorSchemeName } from "react-native";

type QuickAccessProps = {
  id: string;
  title: string;
  icon: string;
  path: string;
};
type CoursesProps = {
  id: string;
  title: string;
  icon: string;
};

export default function TabOneScreen(): JSX.Element {
  const colorScheme: ColorSchemeName = useColorScheme() ?? "light"; // Fallback to "light" if colorScheme is null or undefined
  const [refreshing, setRefreshing] = useState(false);

  const quickAccessItems: QuickAccessProps[] = [
    {
      id: "1",
      title: "Learn",
      icon: "https://via.placeholder.com/40",
      path: "/learn",
    },
    {
      id: "2",
      title: "Resources",
      icon: "https://via.placeholder.com/40",
      path: "/resources",
    },
    {
      id: "3",
      title: "Flashcards",
      icon: "https://via.placeholder.com/40",
      path: "/flashcard",
    },
    {
      id: "4",
      title: "AI Quiz",
      icon: "https://via.placeholder.com/40",
      path: "ai-quiz",
    },
    {
      id: "5",
      title: "Calc. GPA",
      icon: "https://via.placeholder.com/40",
      path: "calc-gpa",
    },
    {
      id: "6",
      title: "Calc. CGPA",
      icon: "https://via.placeholder.com/40",
      path: "calc-cgpa",
    },
  ];

  const courses: CoursesProps[] = [
    {
      id: "1",
      title: "Computer Science",
      icon: "https://via.placeholder.com/40",
    },
    { id: "2", title: "Programming", icon: "https://via.placeholder.com/40" },
    {
      id: "3",
      title: "Data Structures and Algorithms",
      icon: "https://via.placeholder.com/40",
    },
    {
      id: "4",
      title: "Web Development",
      icon: "https://via.placeholder.com/40",
    },
    {
      id: "5",
      title: "Operating Systems",
      icon: "https://via.placeholder.com/40",
    },
    {
      id: "6",
      title: "Mobile App Development",
      icon: "https://via.placeholder.com/40",
    },
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    alert("Refreshed");
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* User Info */}
      <View style={styles.userInfo}>
        <Image
          source={{ uri: "https://via.placeholder.com/80" }}
          style={[styles.userImage, { borderColor: Colors[colorScheme].tint }]}
        />
        <Text style={[styles.userName, { color: Colors[colorScheme].text }]}>
          Welcome User👋
        </Text>
        <Text style={[styles.infoForUser, { color: Colors[colorScheme].text }]}>
          Get access to AI tutor anywhere, anytime!
        </Text>
      </View>

      {/* Quick Access */}
      <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>
        Quick Access
      </Text>
      <View style={styles.quickAccessContainer}>
        {quickAccessItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.quickAccessItem,
              { backgroundColor: Colors[colorScheme].itemBackground },
            ]}
          >
            <Image source={{ uri: item.icon }} style={styles.icon} />
            <Text style={{ color: Colors[colorScheme].text }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* My Courses */}
      <View style={styles.courseContainer}>
        <Text
          style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}
        >
          My Courses
        </Text>
        {courses.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.courseItem,

              { backgroundColor: Colors[colorScheme].itemBackground },
            ]}
          >
            <Image source={{ uri: item.icon }} style={styles.icon} />
            <Text style={{ color: Colors[colorScheme].text }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

type Styles = {
  container: ViewStyle;
  userInfo: ViewStyle;
  userImage: ImageStyle;
  userName: TextStyle;
  infoForUser: TextStyle;
  sectionTitle: TextStyle;
  quickAccessContainer: ViewStyle;
  quickAccessItem: ViewStyle;
  courseContainer: ViewStyle;
  courseItem: ViewStyle;
  icon: ImageStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    padding: 20,
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoForUser: {
    fontSize: 14,
    marginTop: 10,
    opacity: 0.7,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  quickAccessContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickAccessItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "45%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  courseContainer: {
    marginBottom: 24,
    borderRadius: 8,
  },
  courseItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 40,
  },
});
