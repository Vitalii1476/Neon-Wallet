declare module '@hawkingnetwork/ed25519-hd-key-rn' {
    export function derivePath(path: string, seedHex: string): {
      key: Uint8Array;
      chainCode: Uint8Array;
    };
  
    export function getMasterKeyFromSeed(seedHex: string): {
      key: Uint8Array;
      chainCode: Uint8Array;
    };
  }

  declare module 'react-native-secp256k1' {
    const ecc: any;
    export = ecc;
  }