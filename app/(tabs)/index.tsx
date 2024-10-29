import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  ViewStyle,
  ImageStyle,
  TextStyle,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { ColorSchemeName } from "react-native";
import { Href, Link, router } from "expo-router";
import AppImages from "@/constants/AppImages";

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
  path: string;
};

export default function TabOneScreen(): JSX.Element {
  const colorScheme: ColorSchemeName = useColorScheme() ?? "light"; // Fallback to "light" if colorScheme is null or undefined
  const [refreshing, setRefreshing] = useState(false);
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  const myIcon = require("../../assets/images/quickaccess/learn.png");
  const quickAccessItems: QuickAccessProps[] = [
    {
      id: "1",
      title: "Learn",
      icon: "https://i.postimg.cc/j5sb4nK6/learning.png", // Local image
      path: "/(quickAccess)/learn",
    },
    {
      id: "2",
      title: "Resources",
      icon: "https://i.postimg.cc/cCCGVqvr/learning-1.png", // Local image
      path: "/(quickAccess)/resources",
    },

    {
      id: "3",
      title: "AI Quiz",
      icon: "https://i.postimg.cc/7hRr4BzX/quiz.png", // Local image
      path: "/(quickAccess)/ai-quiz",
    },
    {
      id: "4",
      title: "Calc. GPA",
      icon: "https://i.postimg.cc/s2PzW4FD/gpa.png", // Local image
      path: "/(quickAccess)/gpa",
    },
  ];

  const courses: CoursesProps[] = [
    {
      id: "1",
      title: "Computer Science",
      icon: "https://i.postimg.cc/L6Z8Xfsh/computer-science.png",
      path: "/(courses)/computer",
    },
    {
      id: "2",
      title: "Programming",
      icon: "https://i.postimg.cc/FF6KNGN2/database.png",
      path: "/(courses)/programming",
    },
    {
      id: "3",
      title: "Data Structures and Algorithms",
      icon: "https://i.postimg.cc/Gt63K3Xc/algorithm.png",
      path: "/(courses)/datastr",
    },

    {
      id: "5",
      title: "Operating Systems",
      icon: "https://i.postimg.cc/52dNF0Hg/linux-1.png",
      path: "/(courses)/os",
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
          style={[styles.userImage, { borderColor: Colors[colorScheme].tint }]}
          source={{ uri: "https://i.postimg.cc/JnB2J1H3/icon.png" }}
          placeholder={{ blurhash }}
          contentFit="contain"
          transition={1000}
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
            onPress={() => router.navigate(item.path as Href)}
          >
            <Image
              style={styles.icon}
              source={{ uri: item.icon }}
              placeholder={{ blurhash }}
              contentFit="contain"
              transition={1000}
            />
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
          Popular Courses
        </Text>
        {courses.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.courseItem,

              { backgroundColor: Colors[colorScheme].itemBackground },
            ]}
            onPress={() => router.navigate(item.path as Href)}
          >
            <Image
              style={styles.icon}
              source={{ uri: item.icon }}
              placeholder={{ blurhash }}
              contentFit="contain"
              transition={1000}
            />
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
    padding: 4,
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
    borderWidth: 2,
    borderColor: "#013DC4cc",
    borderRadius: 999,
    objectFit: "contain",
    backgroundColor: "white",
  },
});
