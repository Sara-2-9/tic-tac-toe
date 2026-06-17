import { useAi } from "@/context/ai";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [input, setInput] = useState("");
  const { object, error, submit } = useAi();

  if (error) return <Text>{error.message}</Text>;

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View
        style={{
          height: "95%",
          display: "flex",
          flexDirection: "column",
          paddingHorizontal: 8,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          {/* {messages?.map((m) => (
            <View key={m.id} style={{ marginVertical: 8 }}>
              <View>
                <Text style={{ fontWeight: 700 }}>{m.role}</Text>
                {m.parts.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <Text
                          key={`${m.id}-${i}`}
                          style={{
                            width: "50%",
                            backgroundColor: "#caf09c",
                            padding: 12,
                            borderBottomEndRadius: 26,
                            borderTopEndRadius: 26,
                            borderTopStartRadius: 26,
                          }}
                        >
                          {part.text}
                        </Text>
                      );
                  }
                })}
              </View>
            </View>
          ))} */}
        </ScrollView>

        <View style={{ marginTop: 8 }}>
          <TextInput
            style={{
              backgroundColor: "white",
              padding: 12,
              borderRadius: 50,
            }}
            placeholder="Say something..."
            value={input}
            onChange={(e) => setInput(e.nativeEvent.text)}
            onSubmitEditing={(e) => {
              e.preventDefault();
              // sendMessage({ text: input });
              setInput("");
            }}
            autoFocus={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
