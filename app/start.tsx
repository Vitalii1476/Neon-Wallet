import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

export default function Start() {
  const [encryption, setEncryption] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkEncryption = async () => {
      const storedEncryption = await SecureStore.getItemAsync('encrypted');
      setEncryption(storedEncryption);
    };

    checkEncryption();
  }, []);

  const handleCreate = () => {
    router.push('/mnemonic');
  };

  console.log('Enc', encryption)

  return (
    <View style={styles.container}>
      {encryption !== null ? (
        <Text style={{ color: 'white' }}>🔐 Already encrypted</Text>
      ) : (
        <Text style={{ color: 'white' }}>🆕 No encryption yet</Text>
      )}

      <Text style={styles.title}>Створити гаманець</Text>
      <Pressable onPress={handleCreate} style={styles.button}>
        <Text style={styles.buttonText}>Почати</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
  title: { color: 'white', fontSize: 24, marginBottom: 20 },
  button: { backgroundColor: 'white', padding: 15, borderRadius: 10 },
  buttonText: { color: 'black', fontWeight: 'bold' },
});
