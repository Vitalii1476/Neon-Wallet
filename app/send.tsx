import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import transactionService from '@/components/services/createTransaction';
import { walletSessionStore } from '@/store/store';

export default function Send() {
  const [currency, setCurrency] = useState<'ETH' | 'BTC' | 'SOL'>('ETH');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const mnemonic = walletSessionStore.decryptedMnemonic
  const handleSubmit = () => {
    if (!recipient || !amount) {
      Alert.alert('Помилка', 'Заповніть усі поля');
      return;
    }

    const data = {
      currency,
      recipient,
      amount,
    };

    console.log('Send:', data);
    if(currency === 'ETH') transactionService.sendEthereumTransaction(mnemonic, recipient, amount)
    //if(currency === 'BTC') transactionService.sendBitcoinTransaction(mnemonic, recipient, amount)
    if(currency === 'SOL') transactionService.sendSolanaTransaction(recipient, Number(amount))
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Відправити криптовалюту</Text>

      <Text style={styles.label}>Валюта:</Text>
      <Picker
        selectedValue={currency}
        onValueChange={(value) => setCurrency(value)}
        style={styles.picker}
      >
        <Picker.Item label="Ethereum" value="ETH" />
        <Picker.Item label="Bitcoin" value="BTC" />
        <Picker.Item label="Solana" value="SOL" />
      </Picker>

      <Text style={styles.label}>Адреса отримувача:</Text>
      <TextInput
        style={styles.input}
        placeholder="0x..."
        value={recipient}
        onChangeText={setRecipient}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Сума:</Text>
      <TextInput
        style={styles.input}
        placeholder="0.01"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <View style={styles.button}>
        <Button title="Send" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  label: {
    marginTop: 10,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
  },
  picker: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    marginTop: 20,
  },
});
