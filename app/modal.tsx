import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { ExternalLink } from "@/components/ExternalLink";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Explore AI</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.description}>
        Explore AI is an innovative AI teaching app developed as part of a final
        year computer science project. The application aims to provide
        personalized learning experiences to students by utilizing artificial
        intelligence to adapt to individual learning styles and paces. With
        features such as interactive lessons, quizzes, and a comprehensive
        resource hub, Explore AI enhances the learning process and makes
        education more engaging and accessible.
      </Text>
      <ExternalLink
        href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
        style={{ textAlign: "center" }}
      >
        <Text style={styles.downloadLink}>
          To download the soft copy of the project paper, click here: [Download
          Paper]
        </Text>
      </ExternalLink>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  downloadLink: {
    marginTop: 15,
    color: "dodgerblue",
  },
});
