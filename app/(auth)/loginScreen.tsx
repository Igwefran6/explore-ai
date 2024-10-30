// screens/LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { DUMMY_EMAIL, DUMMY_PASSWORD } from "@/constants/authConstants";
import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";

export default function LoginScreen({
  onLoginSuccess,
}: {
  onLoginSuccess: any;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const colorScheme = useColorScheme();
  const currentColors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const handleLogin = () => {
    if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      onLoginSuccess();
    } else {
      Alert.alert(
        "Invalid credentials",
        "Please check your email or password."
      );
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: currentColors.background }]}
    >
      <Text style={[styles.title, { color: currentColors.text }]}>Login</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: currentColors.itemBackground,
            color: currentColors.text,
            borderColor: currentColors.tint,
          },
        ]}
        placeholder="Email"
        placeholderTextColor={currentColors.tabIconDefault}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: currentColors.itemBackground,
            color: currentColors.text,
            borderColor: currentColors.tint,
          },
        ]}
        placeholder="Password"
        placeholderTextColor={currentColors.tabIconDefault}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} color={currentColors.tint} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});
