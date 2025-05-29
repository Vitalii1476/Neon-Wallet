import React from 'react'
import QRCode from 'react-native-qrcode-svg'
import { View, ViewBase } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function qrcodepage() {
   const router = useRouter();
const searchParams = useLocalSearchParams(); // Access query parameters
const myProp = searchParams.myProp as string; // Якщо хочеш явно вказати тип
  return (
   <View>
    <QRCode value={myProp}/>
   </View>
  )
}
