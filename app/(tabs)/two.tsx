import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Image,
} from "react-native";
import { Text, View } from "@/components/Themed";
import axios from "axios";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const colorScheme = useColorScheme() || "light";

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");

    const conversationHistory = [
      ...messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: inputText },
    ];
    try {
      const response = await axios.post(
        "https://cyrobye-aibot.vercel.app/api/chat",
        {
          messages: conversationHistory,
        }
      );
      console.log("Response:", response.data);
      const botMessage: Message = {
        id: Date.now().toString(),
        text: response.data.response,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorBotMessage: Message = {
        id: Date.now().toString(),
        text: "Sorry, I couldn't process your request. Please try again later.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, errorBotMessage]);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === "user" ? styles.userMessage : styles.botMessage,
              {
                backgroundColor:
                  item.sender === "user" ? Colors[colorScheme].tint : "#DCF8C6",
              },
            ]}
          >
            {item.sender === "bot" && (
              <Image
                source={{
                  uri: "https://i.postimg.cc/vTTDXNMv/technical-support.png",
                }}
                style={styles.botImage}
              />
            )}
            <View style={styles.messageContent}>
              <Text
                style={{ color: item.sender === "user" ? "white" : "black" }}
              >
                {item.text}
              </Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.messageList}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={[
            styles.input,
            {
              borderColor: Colors[colorScheme].tint,
              color: Colors[colorScheme].text,
              backgroundColor: Colors[colorScheme].background,
            },
          ]}
          placeholder="Type a message..."
          placeholderTextColor={Colors[colorScheme].tabIconDefault}
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity
          onPress={handleSend}
          style={[
            styles.sendButton,
            { backgroundColor: Colors[colorScheme].tint },
          ]}
        >
          <FontAwesome
            name="send"
            size={24}
            color={Colors[colorScheme].background}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  messageList: { flexGrow: 1, paddingBottom: 10 },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMessage: { alignSelf: "flex-end" },
  botMessage: { alignSelf: "flex-start" },
  messageContent: {
    maxWidth: "85%",
    backgroundColor: "#00000000",
    paddingHorizontal: 8,
  },
  botImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    alignSelf: "flex-start",
  },
  timestamp: {
    fontSize: 10,
    color: "silver",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    padding: 5,
  },
  input: {
    flex: 1,
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
    fontSize: 18,
  },
  sendButton: { padding: 14, borderRadius: 20 },
});
