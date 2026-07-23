import { matrixValue } from "@/constants/matrix";
import { Pressable, StyleSheet, Text } from "react-native";
import z from "zod";
import { ThemedView } from "../themed-view";

type Props = { value: z.infer<typeof matrixValue>; onSquareClick: () => void };

export default function Square({ value, onSquareClick }: Props) {
  return (
    <Pressable onPress={onSquareClick}>
      <ThemedView style={styles.square}>
        <Text style={styles.text}>{value}</Text>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 6,
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    verticalAlign: "middle",
  },
});
