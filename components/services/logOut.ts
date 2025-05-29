import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function logOut() {
  try {
    // Видаляємо з SecureStore
    await SecureStore.deleteItemAsync('encrypted');
    await SecureStore.deleteItemAsync('wallet-mnemonic-key');

    // Очищуємо AsyncStorage повністю
    await AsyncStorage.clear();

    console.log('✅ Успішно вийшов з акаунта');
  } catch (error) {
    console.error('❌ Помилка при виході з акаунта:', error);
  }
}


