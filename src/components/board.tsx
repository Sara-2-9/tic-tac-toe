import { matrix } from "@/constats/matrix";
import { useAi } from "@/context/ai";
import { calculateWinner } from "@/utils/game-winner";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import z from "zod";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import MyButton from "./ui/my-button";
import Square from "./ui/square";

type PositionProps = { row: number; col: number };
type SquaresProps = z.infer<typeof matrix>;

export default function Board() {
  const { object, error, submit, isLoading } = useAi();

  const [squares, setSquares] = useState<SquaresProps>(
    Array(3).fill(Array(3).fill(null)),
  );

  const xCount = squares.flat().filter((value) => value === "X").length;
  const oCount = squares.flat().filter((value) => value === "O").length;

  const nextPlayer = xCount > oCount ? "O" : "X";

  const winner = calculateWinner(squares);

  const hasMoves = xCount > 0 || oCount > 0;

  console.log("squares---", squares);

  useEffect(() => {
    console.log("object---", object);
    if (!isLoading && !!object?.content)
      setSquares(object.content as SquaresProps);
  }, [object, isLoading]);

  function handleClick(position: PositionProps) {
    const operation = squares.map((row, indexRow) =>
      indexRow === position.row
        ? row.map((cell, indexCol) =>
            indexCol === position.col && cell === null ? nextPlayer : cell,
          )
        : row,
    );
    const squaresString = JSON.stringify(operation);
    console.log("squarestring-----", squaresString);
    setSquares(operation);
    submit(squaresString);
  }

  function handleRestart() {
    setSquares(Array(3).fill(Array(3).fill(null)));
  }

  return (
    <ThemedView>
      {squares.map((row, indexRow) => (
        <ThemedView style={styles.grid} key={indexRow}>
          {row.map((cell, indexCol) => (
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
      {error && (
        <ThemedText style={styles.error}>AI error: {error.message}</ThemedText>
      )}
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
  error: {
    marginVertical: 10,
    textAlign: "center",
    color: "#D32F2F",
  },
});
