import { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "./themed-view";
import Square from "./ui/square";

type PositionProps = { row: number; col: number };

export default function Board() {
  const [squares, setSquares] = useState(Array(3).fill(Array(3).fill(null)));

  const xCount = squares.flat().filter((value) => value === "X").length;
  const oCount = squares.flat().filter((value) => value === "O").length;

  const nextPlayer = xCount > oCount ? "O" : "X";

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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  grid: {
    display: "flex",
    flexDirection: "row",
  },
});
