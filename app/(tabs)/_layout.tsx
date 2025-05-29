import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab'; // це твій компонент кнопки вкладки
import { IconSymbol } from '@/components/ui/IconSymbol'; // іконки вкладок
import TabBarBackground from '@/components/ui/TabBarBackground'; // фон вкладки
import { Colors } from '@/constants/Colors'; // кольори
import { useColorScheme } from '@/hooks/useColorScheme'; // для темної/світлої теми

export default function TabLayout() {
  const colorScheme = useColorScheme(); // отримаємо поточну тему (темна/світла)

  return (
    <Tabs
      screenOptions={{
        // Стилізація активних вкладок
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, // активний колір
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].text, // неактивний колір

        headerShown: false, // ховаємо заголовок

        // Стилізація кнопки вкладки (натискання)
        tabBarButton: HapticTab, // твій компонент для натискання

        // Стилізація фону вкладки
        tabBarBackground: TabBarBackground, // кастомний фон вкладки

        // Стилізація вкладки в залежності від платформи
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // для iOS буде абсолютне позиціювання
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // білий напівпрозорий фон
            borderTopWidth: 0, // без верхньої межі
            height: 70, // висота вкладки
            borderTopLeftRadius: 24, // заокруглення лівого верху
            borderTopRightRadius: 24, // заокруглення правого верху
            marginBottom: 10, // відступ внизу
            paddingBottom: 10, // відступ всередині вкладки
            shadowColor: '#000', // тінь
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 10, // тінь для Android
          },
          default: {
            backgroundColor: 'rgba(60, 53, 53, 0.8)',
            height: 70
             // прозорий фон
          },
        }),
      }}
    >
   
   
    
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'wallet',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="box.fill" color={color} />, // іконка
        }}
      />

<Tabs.Screen
        name="swap"
        options={{
          title: 'swap',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="box.fill" color={color} />, // іконка
        }}
      />

<Tabs.Screen
        name="settings"
        options={{
          title: 'settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="box.fill" color={color} />, // іконка
        }}
      />


<Tabs.Screen
        name="market"
        options={{
          title: 'market',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="box.fill" color={color} />, // іконка
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: 'chat',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="box.fill" color={color} />, // іконка
        }}
      />

    </Tabs>
  );
}
