import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAi } from "@/context/ai";
import { useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AiChat() {
  const [input, setInput] = useState("");
  const { messages, error, submit } = useAi();

  function handleSubmit() {
    const text = input.trim();
    if (!text) return;
    submit(text);
    setInput("");
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.messages}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((m) => (
            <View
              key={m.id}
              style={[
                styles.bubble,
                m.role === "user" ? styles.userBubble : styles.assistantBubble,
              ]}
            >
              <ThemedText
                style={
                  m.role === "user" ? styles.userText : styles.assistantText
                }
              >
                {m.text}
              </ThemedText>
              <ThemedText
                style={[
                  styles.timestamp,
                  m.role === "user"
                    ? styles.userTimestamp
                    : styles.assistantTimestamp,
                ]}
              >
                {new Date(m.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </ThemedText>
            </View>
          ))}
          {error && (
            <ThemedText style={styles.error}>
              AI error: {error.message}
            </ThemedText>
          )}
        </ScrollView>

        <TextInput
          style={styles.input}
          placeholder="Say something..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSubmit}
          returnKeyType="send"
          autoFocus={true}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 8,
  },
  messages: {
    flex: 1,
  },
  messagesContent: {
    gap: 8,
    paddingVertical: 8,
  },
  bubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 26,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#0274DF",
    borderBottomEndRadius: 4,
  },
  userText: {
    color: "white",
  },
  assistantBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#caf09c",
    borderBottomStartRadius: 4,
  },
  assistantText: {
    color: "#1a1a1a",
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  userTimestamp: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  assistantTimestamp: {
    color: "rgba(0, 0, 0, 0.45)",
  },
  error: {
    marginVertical: 10,
    textAlign: "center",
    color: "#D32F2F",
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 50,
    marginVertical: 8,
  },
});
