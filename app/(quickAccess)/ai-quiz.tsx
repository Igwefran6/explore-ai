import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";

interface QuizQuestion {
  id: number;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function QuizScreen() {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme || "light"];

  useEffect(() => {
    fetchRandomQuestion();
  }, []);

  const fetchRandomQuestion = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=1&category=18&type=multiple"
      );
      const data = await response.json();
      const fetchedQuestion = data.results[0];
      const shuffledAnswers = [
        fetchedQuestion.correct_answer,
        ...fetchedQuestion.incorrect_answers,
      ].sort(() => Math.random() - 0.5);
      setQuestion({
        ...fetchedQuestion,
        incorrect_answers: shuffledAnswers,
      });
    } catch (error) {
      console.error("Error fetching quiz question:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    const isCorrect = answer === question?.correct_answer;
    setSelectedAnswer(answer);
    Alert.alert(
      isCorrect ? "Correct!" : "Wrong!",
      isCorrect
        ? "You chose the correct answer!"
        : "That's not the right answer.",
      [{ text: "OK", onPress: fetchRandomQuestion }]
    );
  };

  const renderAnswers = () => {
    if (!question) return null;

    return question.incorrect_answers.map((answer, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.answerButton,
          {
            backgroundColor:
              selectedAnswer === answer ? colors.tint : colors.itemBackground,
          },
        ]}
        onPress={() => handleAnswerSelect(answer)}
      >
        <Text style={[styles.answerText, { color: colors.text }]}>
          {answer}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.tint} />
      ) : (
        <>
          <Text style={[styles.questionText, { color: colors.tint }]}>
            {question?.question}
          </Text>
          <View style={styles.answersContainer}>{renderAnswers()}</View>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={fetchRandomQuestion}
          >
            <Text style={styles.nextButtonText}>Next Question</Text>
          </TouchableOpacity>
        </>
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
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  answersContainer: {
    marginBottom: 20,
  },
  answerButton: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  answerText: {
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: "#013DC4",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
