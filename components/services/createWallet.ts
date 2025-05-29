import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ethers } from 'ethers';

import * as bip39 from 'bip39';
import { Keypair } from '@solana/web3.js';

import * as btc from '@scure/btc-signer';
import { HDKey } from '@scure/bip32';
import { wordlist } from '@scure/bip39/wordlists/english';
import { bech32 } from '@scure/base';
import * as secp from '@noble/secp256k1';
import { sha256 } from '@noble/hashes/sha256';
import { ripemd160 } from '@noble/hashes/ripemd160';


const TESTNET = {
  messagePrefix: '\x18Bitcoin Signed Message:\n',
  bech32: 'tb', // Важливо!
  bip32: { public: 0x043587cf, private: 0x04358394 },
  pubKeyHash: 0x6f,
  scriptHash: 0xc4,
  wif: 0xef
};




class WalletService {
  // Метод для створення Ethereum гаманця
  async createEthereumWallet(mnemonic: string) {
    const wallet = ethers.Wallet.fromPhrase(mnemonic); // виправлено на fromMnemonic
    await AsyncStorage.setItem('ethWallet', wallet.address);
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  }

  // Метод для створення Bitcoin гаманця
  async createBitcoinWallet(mnemonic: string) {
    try{
      const seed = bip39.mnemonicToSeedSync(mnemonic);

      // 3. Створити HD-гаманець
      const root = HDKey.fromMasterSeed(seed);
    
      // BIP44 шлях: m/84'/0'/0'/0/0 → P2WPKH (SegWit)
      const child = root.derive("m/84'/0'/0'/0/0");
    
      // 4. Отримати адресу з публічного ключа
      if (!child.publicKey) {
        throw new Error('Public key is null or undefined.');
      }
      const address = getSegwitAddress(child.publicKey, TESTNET);
      await AsyncStorage.setItem('btcWallet', address || '')
      console.log(address)
      return {
        mnemonic,
        privateKey: child.privateKey ? child.privateKey.toString() : (() => { throw new Error('Private key is null'); })(),
        publicKey: child.publicKey ? child.publicKey.toString() : (() => { throw new Error('Public key is null'); })(),
        address,
      };
    }catch(e) {
      console.log('Error in btc wallet creating: ', e)
    }
  }


async createBitcoinTestnetWallet(mnemonic: string) {
  try {
    const seed = bip39.mnemonicToSeedSync(mnemonic);

    const root = HDKey.fromMasterSeed(seed);

    // Шлях для TESTNET: m/84'/1'/0'/0/0
    const child = root.derive("m/84'/1'/0'/0/0");

    if (!child.publicKey) {
      throw new Error('Public key is null or undefined.');
    }

    // Подаємо додатково TESTNET параметри
    const address = getSegwitAddress(child.publicKey, TESTNET);

    await AsyncStorage.setItem('btcTestnetWallet', address || '')
    console.log(address);

    return {
      mnemonic,
      privateKey: child.privateKey ? child.privateKey.toString() : (() => { throw new Error('Private key is null'); })(),
      publicKey: child.publicKey ? child.publicKey.toString() : (() => { throw new Error('Public key is null'); })(),
      address,
    };
  } catch (e) {
    console.log('Error in btc testnet wallet creating: ', e);
  }
}


  // Метод для створення Solana гаманця
  async createSolanaWallet(mnemonic: string) {
    try {
      console.log('Buffer: ',global.Buffer = Buffer)
      console.log('start');
      const seed = await bip39.mnemonicToSeed(mnemonic); // отримуємо seed з мнемоніки
      console.log('1');
      const keypair = Keypair.fromSeed(seed.slice(0, 32)); 
      await SecureStore.setItemAsync('solana-secret-key', JSON.stringify(Array.from(keypair.secretKey)));// використання першого 32 байта seed
      console.log('2');
      const address = keypair.publicKey.toBase58(); // отримання публічного ключа (адреси)
      console.log('3');
      await AsyncStorage.setItem('solWallet', address);
      console.log('4');
      console.log('✅ Адреса Solana:', address);
      return { address, keypair };
    } catch (error) {
      console.log('Buffer: ',global.Buffer = Buffer)
      console.error("Error creating Solana wallet:", error);
    }
  }

  // Метод для отримання всіх гаманців
  async getAllWallets() {
    const mnemonic = await this.getMnemonic();
    const ethWallet = await this.createEthereumWallet(mnemonic);
   // const bitcoinWallet = await this.createBitcoinWallet(mnemonic);
    // const solanaWallet = await this.createSolanaWallet(mnemonic); // Розкоментувати, якщо потрібно

    return {
      mnemonic,
      ethereum: ethWallet,
    //  bitcoin: bitcoinWallet,
      // solana: solanaWallet, // Розкоментувати, якщо потрібно
    };
  }

  // Метод для отримання або створення мнемонічного ключа
  async getMnemonic(): Promise<string> {
    const mnemonic = await SecureStore.getItemAsync('wallet-mnemonic-key');
    return mnemonic || '';
  }
}

const walletService = new WalletService();

export default walletService;
function getSegwitAddress(publicKey: Uint8Array, network: { bech32: string }): string {
  if (!publicKey) {
    throw new Error('Public key is null');
  }

  const pubKeyHash = ripemd160(sha256(publicKey)); // Hash160
  const words = bech32.toWords(pubKeyHash);
  words.unshift(0); // Версія адреси 0 для P2WPKH

  const address = bech32.encode(network.bech32, words); // <-- тепер network.bech32!
  return address;
}
