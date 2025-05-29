import RecieveCard from '@/components/ui/RecieveCard';
import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Recieve() {

  type Props = {
    address: string;
    name: string;
  };

  const obj = {
    address: '123',
    name: '123'
  }

  const[btc, setBtc] = useState('')
  const[eth, setEth] = useState('')
  const[sol, setSol] = useState('')

  useEffect(() => {
    const adresses = async() => {
      let btc = await AsyncStorage.getItem('btcWallet');
      setBtc(btc || '')
      let eth = await AsyncStorage.getItem('ethWallet');
      setEth(eth || '')
      let sol = await AsyncStorage.getItem('solWallet');
      setSol(sol || '')
    }

    adresses()
  },[])

  return (
    <View style={styles.container}>
      <RecieveCard  address={btc} name="Bitcoin"/>
      <RecieveCard  address={eth} name="Ethereum"/>
      <RecieveCard address={sol} name="Solana"/>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                    // займати весь екран
    justifyContent: 'center',   // вирівнювання по вертикалі
    alignItems: 'center',       // вирівнювання по горизонталі
    backgroundColor: 'green',   // фон для перевірки
    gap: 30,                    // відстань між QR і кнопками
  },
});
