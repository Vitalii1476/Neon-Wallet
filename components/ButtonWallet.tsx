import React from 'react';
import { View, Pressable, Text, Image, StyleSheet } from 'react-native';

interface Props {
  text: string;
  img: keyof typeof imagePaths;
  onPress: () => void; 
}

const imagePaths = {
  send: require('../assets/images/send.png'),
  recieve: require('../assets/images/plus.png'),
};

export default function ButtonWallet(props: Props) {

    console.log(imagePaths[props.img].uri);
 
  const path = imagePaths[props.img].uri;

  return (
    <Pressable style={styles.Main} onPress={props.onPress}>
      <Image style={styles.Image} source={path} /> 
      <Text>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Main: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: 'gray',
    borderRadius: 10,
    
  },
  Image: {
    width: 40,
    height: 40,
  },
});
