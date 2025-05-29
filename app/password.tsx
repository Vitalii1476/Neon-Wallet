import { useState } from 'react';
import { View, TextInput, Text, Pressable, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import CryptoJS from 'crypto-js'
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function CreatePasswordScreen() {
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { mnemonic } = useLocalSearchParams();

  const handleSave = async () => {
    try {
      
       console.log(mnemonic)
      console.log('Before encryption');
      const encrypted = CryptoJS.AES.encrypt(mnemonic as string, password).toString();
      console.log('After encryption');
      console.log('Before SecureStore.setItem');
    
      await SecureStore.setItemAsync('encrypted', encrypted)
      console.log('encrypted:', encrypted)
      const a = await SecureStore.getItemAsync('encrypted');; 
      console.log(a);
      router.replace('/wallet');
    } catch (e) {
      Alert.alert('Помилка', 'Не вдалося зберегти гаманець');
    }
  };
  console.log(password)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Створи пароль</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Пароль"
        placeholderTextColor="#777"
        onChangeText={setPassword}
      />
      <Pressable onPress={handleSave} style={styles.button}>
        <Text style={styles.buttonText}>Зберегти</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', padding: 20, justifyContent: 'center' },
  title: { color: 'white', fontSize: 22, marginBottom: 10 },
  input: { backgroundColor: '#222', color: 'white', padding: 15, borderRadius: 10, marginBottom: 20 },
  button: { backgroundColor: 'white', padding: 15, borderRadius: 10 },
  buttonText: { textAlign: 'center', fontWeight: 'bold' },
});
