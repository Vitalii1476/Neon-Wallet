import * as React from "react";
import { Text, Pressable, StyleSheet } from 'react-native';

export default function Card({ text }: { text: string }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Pressable
      style={[styles.button, isHovered && styles.buttonHovered]}
      onPressIn={() => setIsHovered(true)} // коли кнопка натискається
      onPressOut={() => setIsHovered(false)} // коли кнопка перестає бути натиснута
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    height: 50,
    width: 130,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // для кращого вигляду
  },
  buttonHovered: {
    backgroundColor: 'lightblue', // колір при ховері
  },
  text: {
    color: 'black',
  },
});
