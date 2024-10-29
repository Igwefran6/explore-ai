import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

export default function CalcGPA() {
  const [grades, setGrades] = useState<string[]>([]);
  const [credits, setCredits] = useState<string[]>([]);
  const [gpa, setGpa] = useState<number | null>(null);

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
      const credit = parseInt(credits[index]) || 0; // Convert credit to integer
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

  // Calculate width for the GPA bar
  const getGpaBarWidth = () => {
    if (gpa === null) return 0;
    return Math.min((gpa / 5) * 100, 100); // Max 100%
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GPA Calculator</Text>

      {grades.map((grade, index) => (
        <View key={index} style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Grade (A, B, C, D, E, F)"
            value={grade}
            onChangeText={(text) => {
              const newGrades = [...grades];
              newGrades[index] = text;
              setGrades(newGrades);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Credits"
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
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleAddCourse}>
        <Text style={styles.buttonText}>Add Course</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={calculateGPA}>
        <Text style={styles.buttonText}>Calculate GPA</Text>
      </TouchableOpacity>

      {gpa !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Your GPA: {gpa}</Text>
          <View style={styles.gpaBarContainer}>
            <View style={[styles.gpaBar, { width: `${getGpaBarWidth()}%` }]} />
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
    backgroundColor: "#F5F5F5", // Optional: Set a background color for better visibility
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
    alignItems: "center", // Align items vertically centered
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    width: "35%", // Adjusted width to fit the remove button
    backgroundColor: "#fff",
  },
  removeButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    padding: 10,
    marginLeft: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#013DC4",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10, // Adds vertical margin between buttons
    alignItems: "center", // Centers text horizontally
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16, // Optional: Increase text size for better visibility
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  result: {
    fontSize: 18,
    marginBottom: 10,
    color: "#013DC4",
  },
  gpaBarContainer: {
    width: "100%",
    height: 20,
    borderRadius: 10,
    backgroundColor: "#e0e0e0", // Background for the bar
    overflow: "hidden", // Ensures the inner bar respects the container's borders
  },
  gpaBar: {
    height: "100%",
    backgroundColor: "#013DC4", // Color of the GPA bar
    borderRadius: 10,
  },
});
