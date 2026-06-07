import { calculateWinner } from "@/utils/game-winner";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import MyButton from "./ui/my-button";
import Square from "./ui/square";

type PositionProps = { row: number; col: number };

export default function Board() {
  const [squares, setSquares] = useState(Array(3).fill(Array(3).fill(null)));

  const xCount = squares.flat().filter((value) => value === "X").length;
  const oCount = squares.flat().filter((value) => value === "O").length;

  const nextPlayer = xCount > oCount ? "O" : "X";

  const winner = calculateWinner(squares);

  const hasMoves = xCount > 0 || oCount > 0;

  function handleClick(position: PositionProps) {
    setSquares((prev) =>
      prev.map((row, indexRow) =>
        indexRow === position.row
          ? row.map((cell: number, indexCol: number) =>
              indexCol === position.col && cell === null ? nextPlayer : cell,
            )
          : row,
      ),
    );
  }

  function handleRestart() {
    setSquares(Array(3).fill(Array(3).fill(null)));
  }

  return (
    <ThemedView>
      {squares.map((row, indexRow) => (
        <ThemedView style={styles.grid} key={indexRow}>
          {row.map((cell: string, indexCol: number) => (
            <Square
              key={indexCol}
              value={cell}
              onSquareClick={() =>
                handleClick({
                  row: indexRow,
                  col: indexCol,
                })
              }
            />
          ))}
        </ThemedView>
      ))}
      <MyButton
        title="Restart Game"
        disabled={!hasMoves}
        onPress={handleRestart}
      />
      {winner && (
        <ThemedText style={styles.winner}>
          <Ionicons name="star" size={20} color="#F0BD44" /> Winner: {winner}{" "}
          <Ionicons name="star" size={20} color="#F0BD44" />
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  grid: {
    display: "flex",
    flexDirection: "row",
  },
  winner: {
    marginVertical: 10,
    textAlign: "center",
  },
});
