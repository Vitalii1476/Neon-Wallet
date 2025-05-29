import React from 'react';
import * as Clipboard from 'expo-clipboard';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
    address: string;
    name: string;
  };
  
  export default function RecieveCard({ address, name }: Props) {
    const router = useRouter();
  
    function goToQR() {
      router.push({ pathname: '../qrcodepage', params: { myProp: address } });
    }
  
    function copyToClipboard() {
      console.log(address);
      Clipboard.setStringAsync(address);
      console.log('Address copied:', address);
    }
  
    return (
      <View style={styles.container}>
        <Text>{name}</Text>
  
        <Pressable style={styles.button} onPress={copyToClipboard}>
          <Text style={styles.buttonText}>Copy</Text>
        </Pressable>
  
        <Pressable style={styles.button} onPress={goToQR}>
          <Text style={styles.buttonText}>QRCode</Text>
        </Pressable>
      </View>
    );
  }
  
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    padding: 20,
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    width: 150,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
