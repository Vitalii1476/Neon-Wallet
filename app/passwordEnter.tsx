import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Wallet } from 'ethers';
import CryptoJS from 'crypto-js';
import { Redirect } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { walletSessionStore } from '../store/store';

const Login = observer(() => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [redirect, setRedirect] = useState(false); // 👉 додаємо стан редіректу

  const handleLogin = async () => {
    try {
      const encrypted = await SecureStore.getItemAsync('encrypted');
      if (!encrypted) {
        setError('Гаманець не знайдено');
        return;
      }

      const decryptedBytes = CryptoJS.AES.decrypt(encrypted, password);
      const decryptedPhrase = decryptedBytes.toString(CryptoJS.enc.Utf8);
      console.log('decrytped phrase: ', decryptedPhrase)
      walletSessionStore.setMnemonic(decryptedPhrase)
      if (!decryptedPhrase) {
        setError('Неправильний пароль або зіпсована енкрипція');
        return;
      }
      setRedirect(true);
    } catch (err) {
      setError('Помилка при розшифруванні: ' + err);
    }
  };

  if (redirect) {
    return <Redirect href={'../wallet'} />;
  }

  return (
    <View>
      <TextInput
        placeholder="Введіть пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Увійти" onPress={handleLogin} />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      {walletAddress ? <Text>Адреса: {walletAddress}</Text> : null}
    </View>
  );
})

export default Login