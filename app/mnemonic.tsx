import 'react-native-get-random-values';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import * as bip39 from 'bip39';
import { useRouter } from 'expo-router';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

export default function ShowMnemonicScreen() {
  const [mnemonic, setMnemonic] = useState('');
  const router = useRouter();

  useEffect(() => {
    const generate = async () => {
      console.log('Generating mnemonic...');
      try {
        const phrase = await bip39.generateMnemonic();
        console.log('Generated mnemonic:', phrase);
        setMnemonic(phrase);
      } catch (error) {
        console.error('Error generating mnemonic:', error);
      }
    };

    generate();
  }, []);

  const handleContinue = () => {
    router.push({ pathname: '/password', params: { mnemonic } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Запиши свою сид-фразу:</Text>
      <ScrollView contentContainerStyle={styles.box}>
        {mnemonic ? (
          <Text style={styles.mnemonic}>{mnemonic}</Text>
        ) : (
          <Text style={styles.loadingText}>Завантаження...</Text>
        )}
      </ScrollView>
      <Pressable 
        style={[styles.button, !mnemonic && { opacity: 0.5 }]} 
        onPress={handleContinue}
        disabled={!mnemonic}
      >
        <Text style={styles.buttonText}>Я зберіг</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { color: 'white', fontSize: 22, marginBottom: 10, textAlign: 'center' },
  box: { backgroundColor: '#111', padding: 20, borderRadius: 10, marginBottom: 20, width: '100%', maxWidth: 500 },
  mnemonic: { color: 'white', fontSize: 18, textAlign: 'center' },
  loadingText: { color: '#aaa', fontSize: 18, textAlign: 'center' },
  button: { backgroundColor: 'white', padding: 15, borderRadius: 10, width: '100%', maxWidth: 300 },
  buttonText: { textAlign: 'center', fontWeight: 'bold', color: '#333' },
});
