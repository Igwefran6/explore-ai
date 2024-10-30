import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";

export default function CalcGPA() {
  const [grades, setGrades] = useState<string[]>([]);
  const [credits, setCredits] = useState<string[]>([]);
  const [gpa, setGpa] = useState<number | null>(null);

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || "light"];

  const gradeToPoint = (grade: string): number => {
    switch (grade.toUpperCase()) {
      case "A":
        return 5;
      case "B":
        return 4;
      case "C":
        return 3;
      case "D":
        return 2;
      case "E":
        return 1;
      case "F":
        return 0;
      default:
        return 0; // Invalid grade
    }
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    grades.forEach((grade, index) => {
      const points = gradeToPoint(grade);
      const credit = parseInt(credits[index]) || 0;
      totalPoints += points * credit;
      totalCredits += credit;
    });

    if (totalCredits > 0) {
      setGpa(parseFloat((totalPoints / totalCredits).toFixed(2)));
    } else {
      setGpa(0);
    }
  };

  const handleAddCourse = () => {
    setGrades([...grades, ""]);
    setCredits([...credits, ""]);
  };

  const handleRemoveCourse = (index: number) => {
    const newGrades = grades.filter((_, i) => i !== index);
    const newCredits = credits.filter((_, i) => i !== index);
    setGrades(newGrades);
    setCredits(newCredits);
  };

  const getGpaBarWidth = () => {
    if (gpa === null) return 0;
    return Math.min((gpa / 5) * 100, 100);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.tint }]}>GPA Calculator</Text>

      {grades.map((grade, index) => (
        <View key={index} style={styles.inputRow}>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.itemBackground, color: colors.text },
            ]}
            placeholder="Grade (A, B, C, D, E, F)"
            placeholderTextColor={colors.text}
            value={grade}
            onChangeText={(text) => {
              const newGrades = [...grades];
              newGrades[index] = text;
              setGrades(newGrades);
            }}
          />
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.itemBackground, color: colors.text },
            ]}
            placeholder="Credits"
            placeholderTextColor={colors.text}
            keyboardType="numeric"
            value={credits[index]}
            onChangeText={(text) => {
              const newCredits = [...credits];
              newCredits[index] = text;
              setCredits(newCredits);
            }}
          />
          <TouchableOpacity
            onPress={() => handleRemoveCourse(index)}
            style={[styles.removeButton, { backgroundColor: colors.tint }]}
          >
            <Text
              style={[styles.removeButtonText, { color: colors.background }]}
            >
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.tint }]}
        onPress={handleAddCourse}
      >
        <Text style={[styles.buttonText, { color: colors.background }]}>
          Add Course
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.tint }]}
        onPress={calculateGPA}
      >
        <Text style={[styles.buttonText, { color: colors.background }]}>
          Calculate GPA
        </Text>
      </TouchableOpacity>

      {gpa !== null && (
        <View style={styles.resultContainer}>
          <Text style={[styles.result, { color: colors.tint }]}>
            Your GPA: {gpa}
          </Text>
          <View style={styles.gpaBarContainer}>
            <View
              style={[
                styles.gpaBar,
                { width: `${getGpaBarWidth()}%`, backgroundColor: colors.tint },
              ]}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    width: "35%",
  },
  removeButton: {
    borderRadius: 8,
    padding: 10,
    marginLeft: 5,
  },
  removeButtonText: {
    fontWeight: "bold",
  },
  button: {
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  result: {
    fontSize: 18,
    marginBottom: 10,
  },
  gpaBarContainer: {
    width: "100%",
    height: 20,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
  },
  gpaBar: {
    height: "100%",
    borderRadius: 10,
  },
});
