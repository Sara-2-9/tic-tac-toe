import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";

type MyButtonProps = {
  title: string;
  disabled?: boolean;
  onPress: () => void;
};

export default function MyButton({ title, disabled, onPress }: MyButtonProps) {
  return (
    <Pressable
      style={[styles.button, disabled && styles.buttonDisabled]}
      disabled={disabled}
      onPress={onPress}
    >
      <ThemedText style={styles.text}>{title}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 30,
    borderRadius: 24,
    backgroundColor: "#0274DF",
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    paddingVertical: 10,
    color: "white",
  },
});
