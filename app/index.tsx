import React, { useState, useEffect } from 'react';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const [encryption, setEncryption] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const enc = async () => {
      const check = await SecureStore.getItem('encrypted');
      setEncryption(check);
      setLoading(false);
    };
    enc();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return encryption ? <Redirect href={'./passwordEnter'} /> : <Redirect href={'./start'} />;
}
