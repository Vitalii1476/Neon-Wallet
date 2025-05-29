import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Market() {
  const [coins, setCoins] = useState<Array<{
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
  }>>([]);
  const [loading, setLoading] = useState(true);

  const fetchMarketData = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 20,
            page: 1,
            sparkline: false,
          },
        }
      );
      setCoins(response.data);
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name} ({item.symbol.toUpperCase()})</Text>
      <Text>💲 Price: ${item.current_price.toLocaleString()}</Text>
      <Text style={{ color: item.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
        📈 24h Change: {item.price_change_percentage_24h.toFixed(2)}%
      </Text>
      <Text>🏦 Market Cap: ${item.market_cap.toLocaleString()}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00cc99" />
        <Text>Loading market data...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={coins}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
});
