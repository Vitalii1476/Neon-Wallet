import * as SecureStore from 'expo-secure-store';

import { ethers } from 'ethers';

import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';


function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) throw new Error('Invalid hex string');
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

class TransactionService {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/e79407a7cee84ea9b6877b8b5d751917');

  }

  async sendEthereumTransaction(mnemonic: string, to: string, amountInEth: string) {
    try {
      console.log('start')
      const wallet = ethers.Wallet.fromPhrase(mnemonic).connect(this.provider);

      const balance = await this.provider.getBalance(wallet);
      console.log(balance)
      console.log(wallet.address)

  

      // Створення транзакції
      const tx = {
        to: to,
        value: ethers.parseEther(amountInEth),
        gasLimit: 21000,
      
      };

      // Надсилання транзакції
      const txResponse = await wallet.sendTransaction(tx);

      console.log('TX hash:', txResponse.hash);

      // Очікування підтвердження
      await txResponse.wait();

      console.log("TX hash:", txResponse.hash);

      return txResponse.hash;
    } catch (error) {
      console.error('Transaction error:', error);
      throw error;
    }
  }

  async sendSolanaTransaction(to: string, amountInSol: number) {
    console.log('start');
    
    // Чекаємо на отримання значення з SecureStore
    const secretKeyString = await SecureStore.getItemAsync('solana-secret-key');
    console.log(secretKeyString);
    
    if (!secretKeyString) {
      throw new Error("No secret key found in SecureStore.");
    }
    console.log('13');
    const secretKeyArray = JSON.parse(secretKeyString);
    const sender = Keypair.fromSecretKey(Uint8Array.from(secretKeyArray));
    console.log(sender);
  
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const recipient = new PublicKey(to);
  
    const amountInLamports = Math.round(amountInSol * LAMPORTS_PER_SOL);
    console.log(amountInLamports);
  
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: recipient,
        lamports: amountInLamports,
      })
    );
  
    const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
    console.log("✅ Transaction confirmed with signature:", signature);
  }
  async sendBitcoinTransaction(mnemonic: string, to: string, amountInEth: string) {
 
  }

}

function clusterApiUrl(network: string): string {
  const urls: { [key: string]: string } = {
    devnet: 'https://api.devnet.solana.com',
    testnet: 'https://api.testnet.solana.com',
    mainnet: 'https://api.mainnet-beta.solana.com',
  };

  if (!urls[network]) {
    throw new Error(`Unsupported network: ${network}`);
  }

  return urls[network];
}

const transactionService = new TransactionService();
export default transactionService