import { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { View, Text, TextInput, Button } from 'react-native';

const ONE_INCH_API = "https://api.1inch.dev/swap/v5.2/1";
const USDC_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"; // приклад: USDC на Ethereum
const PRIVATE_KEY = "твій_приватний_ключ";
const RPC_URL = "https://rpc.ankr.com/eth"; // або Infura / Alchemy

export default function SwapComponent() {
  const [amountEth, setAmountEth] = useState('');
  const [status, setStatus] = useState('');

  const handleSwap = async () => {
    try {
      const amountWei = ethers.parseEther(amountEth);

      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

      // Отримуємо дані для транзакції з 1inch
      const { data } = await axios.get(`${ONE_INCH_API}/swap`, {
        params: {
          fromTokenAddress: ethers.ZeroAddress, // ETH
          toTokenAddress: USDC_ADDRESS,
          amount: amountWei.toString(),
          fromAddress: wallet.address,
          slippage: 1,
        },
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_1INCH_API_KEY}` // або встав напряму
        }
      });

      setStatus("🔄 Відправка транзакції...");

      const tx = await wallet.sendTransaction({
        to: data.tx.to,
        data: data.tx.data,
        value: BigInt(data.tx.value),
        gasLimit: BigInt(data.tx.gas), // опційно
      });

      await tx.wait();
      setStatus("🎉 Свап завершено!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Помилка свапу");
    }
  };

  return (
    <View style={{ padding: 20,  }}>
      <Text>Введи суму ETH для свапу в USDC:</Text>
      <TextInput
        placeholder="0.01"
        keyboardType="decimal-pad"
        value={amountEth}
        onChangeText={setAmountEth}
        style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
      />
      <Button title="💱 Зробити свап" onPress={handleSwap} />
      <Text style={{ marginTop: 10 }}>{status}</Text>
    </View>
  );
}
