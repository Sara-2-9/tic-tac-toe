import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import Square from "./ui/square";

type PositionProps = { row: number; col: number };

export default function Board() {
  const [squares, setSquares] = useState(Array(3).fill(Array(3).fill(null)));

  const xCount = squares.flat().filter((value) => value === "X").length;
  const oCount = squares.flat().filter((value) => value === "O").length;

  const nextPlayer = xCount > oCount ? "O" : "X";

  const coordsWinner = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
  ];

  const winningCombo = coordsWinner.find((combo) => {
    const [a, b, c] = combo;
    const valueA = squares[a[0]][a[1]];
    const valueB = squares[b[0]][b[1]];
    const valueC = squares[c[0]][c[1]];
    return valueA === valueB && valueB === valueC && valueA !== null;
  });

  const winner = winningCombo
    ? squares[winningCombo[0][0]][winningCombo[0][1]]
    : null;

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
    paddingVertical: 20,
    textAlign: "center",
  },
});
