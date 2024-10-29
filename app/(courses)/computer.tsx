import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";

// Mapping lesson titles to their respective content
const lessons = [
  {
    title: "Introduction to the Course",
    content: `Welcome to the course! In this module, we will cover the fundamentals of the subject, including key concepts, terminologies, and an overview of what you can expect to learn throughout the course. This is your starting point, and we encourage you to engage with the material fully!`,
  },
  {
    title: "Lesson 1: Basics",
    content: `In this lesson, we will explore the basic concepts that form the foundation of our subject. You will learn about essential terms and ideas, which will help you understand more complex topics later on. Make sure to take notes as we go along!`,
  },
  {
    title: "Lesson 2: Advanced Topics",
    content: `Building on the basics, this lesson delves into advanced topics. We will cover sophisticated theories and applications that are critical to mastering the subject. Prepare for an in-depth analysis and critical thinking exercises to reinforce your understanding.`,
  },
  {
    title: "Lesson 3: Practical Examples",
    content: `Now that you have a solid grasp of the basics and advanced topics, we will examine practical examples. This lesson focuses on real-world applications of what you have learned. Case studies and examples will help illustrate how the concepts are applied in various scenarios.`,
  },
  {
    title: "Conclusion",
    content: `Congratulations on reaching the conclusion of this course! In this final module, we will recap the key takeaways, discuss further learning opportunities, and how you can apply your knowledge moving forward. Thank you for your participation!`,
  },
];

export default function Course() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.lessonTitle}>
          {lessons[currentLessonIndex].title}
        </Text>
        <Text style={styles.lessonContent}>
          {lessons[currentLessonIndex].content}
        </Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Previous Lesson"
          onPress={handlePreviousLesson}
          disabled={currentLessonIndex === 0} // Disable button on the first lesson
          color="#013DC4" // Change button color
        />
        <Button
          title="Next Lesson"
          onPress={handleNextLesson}
          disabled={currentLessonIndex === lessons.length - 1} // Disable button on the last lesson
          color="#013DC4" // Change button color
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start", // Align items to the top
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  lessonTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#013DC4", // Title color
  },
  lessonContent: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "justify", // Justify text for better readability
    color: "#333", // Content color
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%", // Take full width for button spacing
    marginTop: 20,
  },
});
