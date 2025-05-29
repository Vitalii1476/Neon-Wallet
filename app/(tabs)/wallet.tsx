import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import walletService from '@/components/services/createWallet';
import logOut from '@/components/services/logOut';
import { walletSessionStore } from '@/store/store';
import { useRouter } from 'expo-router';
import ButtonWallet from '@/components/ButtonWallet';


const apiKey = '988V3T6S24EBVH3AU7PCXGCTQ7GJ6235QP';

export default function CryptoDashboard() {
  const [selectedCrypto, setSelectedCrypto] = useState<'Ethereum' | 'Bitcoin' | 'Solana'>('Ethereum');
  const [ethAddress, setEthAddress] = useState('');
  const [btcAddress, setBtcAddress] = useState('');
  const [solAddress, setSolAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogOut = async () => {
    await logOut();
  }

  const navigateToRecieve = () => {
    router.push('../recieve');
  };

  const navigateToSend = () => {
    router.push('../send');
  };

  const navigateToStart = () => {
    router.push('../start');
  };


  const handleCreateEth = () => {
    let mnemonic = walletSessionStore.decryptedMnemonic
    console.log(mnemonic)
    if (mnemonic) {
     console.log('Wallet is creating')
     let wallet = walletService.createEthereumWallet(mnemonic);
     console.log('Wallet was created')
    } else {
      console.error('Mnemonic is null or undefined');
    }
  }


  const handleCreateSol = async() => {
    let mnemonic = walletSessionStore.decryptedMnemonic
    console.log(mnemonic)
    if (mnemonic) {
     console.log('Wallet is creating')
     console.log(mnemonic)
     let wallet = await walletService.createSolanaWallet(mnemonic);
     console.log('Wallet was created')
    } else {
      console.error('Mnemonic is null or undefined');
    }
  }

  const handleCreateBtc = async() => {
    let mnemonic = walletSessionStore.decryptedMnemonic
    console.log(mnemonic)
    if (mnemonic) {
     console.log('Wallet is creating')
    let wallet = await walletService.createBitcoinWallet(mnemonic);
     console.log('Wallet was created')
    } else {
      console.error('Mnemonic is null or undefined');
    }
  }


  const handleGet = async () => {
      let wallets = await AsyncStorage.getItem('btcWallet')
      if (wallets) {
        console.log(wallets);
      } else {
        console.log('No wallets found');
      }
  }

  useEffect(() => {
    const fetchAddresses = async () => {
      const eth = await AsyncStorage.getItem('ethWallet');
      const btc = await AsyncStorage.getItem('btcWallet');
      const sol = await AsyncStorage.getItem('solWallet');
      setEthAddress(eth || '');
      setBtcAddress(btc || '');
      setSolAddress(sol || '');
    };

    fetchAddresses();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (selectedCrypto === 'Ethereum' && ethAddress) {
          // Fetch Ethereum balance
          const balanceRes = await axios.get('https://api-sepolia.etherscan.io/api', {
            params: {
              module: 'account',
              action: 'balance',
              address: ethAddress,
              tag: 'latest',
              apikey: apiKey,
            },
          });
          const wei = balanceRes.data.result;
          const eth = parseFloat(wei) / 1e18;
          setBalance(`${eth.toFixed(5)} ETH`);

          // Fetch Ethereum transactions
          const txRes = await axios.get('https://api-sepolia.etherscan.io/api', {
            params: {
              module: 'account',
              action: 'txlist',
              address: ethAddress,
              startblock: 0,
              endblock: 99999999,
              page: 1,
              offset: 10,
              sort: 'desc',
              apikey: apiKey,
            },
          });
          setTransactions(txRes.data.result);
        } else if (selectedCrypto === 'Bitcoin' && btcAddress) {
          // Fetch Bitcoin balance and transactions
          const res = await axios.get(`https://api.blockchair.com/bitcoin/dashboards/address/${btcAddress}?transaction_details=true`);
          const data = res.data.data[btcAddress];
          const btc = parseFloat(data.address.balance) / 1e8;
          setBalance(`${btc.toFixed(5)} BTC`);
          setTransactions(data.transactions);
        } else if (selectedCrypto === 'Solana' && solAddress) {
          // Fetch Solana balance and transactions
          const connection = new Connection(clusterApiUrl('mainnet-beta'));
          const publicKey = new PublicKey(solAddress);
          const lamports = await connection.getBalance(publicKey);
          const sol = lamports / 1e9;
          setBalance(`${sol.toFixed(5)} SOL`);

          const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 });
          const txs = [];
          for (const sig of signatures) {
            const tx = await connection.getTransaction(sig.signature);
            txs.push(tx);
          }
          setTransactions(txs);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setBalance('Error');
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCrypto, ethAddress, btcAddress, solAddress]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, selectedCrypto === 'Ethereum' && styles.selectedButton]}
          onPress={() => setSelectedCrypto('Ethereum')}
        >
          <Text style={styles.buttonText}>Ethereum</Text>
        </Pressable>
        <Pressable
          style={[styles.button, selectedCrypto === 'Bitcoin' && styles.selectedButton]}
          onPress={() => setSelectedCrypto('Bitcoin')}
        >
          <Text style={styles.buttonText}>Bitcoin</Text>
        </Pressable>
        <Pressable
          style={[styles.button, selectedCrypto === 'Solana' && styles.selectedButton]}
          onPress={() => setSelectedCrypto('Solana')}
        >
          <Text style={styles.buttonText}>Solana</Text>
        </Pressable>
      </View>

      <ButtonWallet text='Recieve' img='recieve' onPress={navigateToRecieve}></ButtonWallet>
      <ButtonWallet text='Send' img='send' onPress={navigateToSend}></ButtonWallet>

      <Text style={styles.balanceText}>Balance: {balance}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.transactionList}>
          {transactions.map((tx, index) => (
            <View key={index} style={styles.transactionItem}>
              <Text style={styles.transactionText}>
                {selectedCrypto === 'Ethereum' && `Hash: ${tx.hash}`}
                {selectedCrypto === 'Bitcoin' && `Hash: ${tx.hash}`}
                {selectedCrypto === 'Solana' && `Signature: ${tx?.transaction?.signatures[0]}`}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  balanceText: {
    fontSize: 18,
    marginBottom: 16,
  },
  transactionList: {
    flex: 1,
  },
  transactionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionText: {
    fontSize: 14,
  },
});
