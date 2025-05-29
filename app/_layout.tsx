import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Redirect } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';
import * as SecureStore from 'expo-secure-store';

// Забороняємо автоматичне приховування SplashScreen, поки не завантажиться все
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  
  // Ховаємо SplashScreen після завантаження шрифтів
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Якщо шрифти ще не завантажені або перевірка гаманця не завершена, показуємо лоадер
 
  // Якщо гаманця немає, редиректимо на стартовий екран
  
   
  

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="send" options={{ headerShown: false }} />
        <Stack.Screen name="recieve" options={{ headerShown: false }} />
        <Stack.Screen name="start" options={{ headerShown: false }} />
        <Stack.Screen name="password" options={{ headerShown: false }} />
        <Stack.Screen name="mnemonic" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
