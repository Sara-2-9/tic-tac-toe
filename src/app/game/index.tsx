import Board from "@/components/board";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useAi } from "@/context/ai";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Game() {
  const { messages } = useAi();
  const countMessages = messages?.length;
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText style={styles.title}>Tic-Tac-Toe</ThemedText>
        <Board />
        <ThemedText>Message Count: {countMessages}</ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  title: {
    paddingVertical: 20,
    fontSize: 30,
    color: "#0274DF",
    fontWeight: "bold",
  },
});
