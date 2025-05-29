import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  currency: string;
  total: string;
  totalusdt: string;
}

export default function CryptoBalanceCard(props: Props) {
  return (
    <View style={styles.Main}>
      <View style={styles.Logo} />
      <View style={styles.TextBlock}>
        <Text style={styles.Currency}>{props.currency}</Text>
        <Text style={styles.Total}>{props.total}</Text>
      </View>
      <Text style={styles.TotalUSD}>{props.totalusdt}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  Main: {
    backgroundColor: 'white',
    width: 390,
    height: 80,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  Logo: {
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 7,
    marginRight: 16,
  },
  TextBlock: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  Currency: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  Total: {
    color: 'gray',
    fontSize: 14,
  },
  TotalUSD: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
