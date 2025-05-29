import { makeAutoObservable } from "mobx";

class WalletSessionStore {
  decryptedMnemonic: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setMnemonic(mnemonic: string) {
    this.decryptedMnemonic = mnemonic;
  }

  clearMnemonic() {
    this.decryptedMnemonic = "";
  }

  get hasSession() {
    return !!this.decryptedMnemonic;
  }
}

export const walletSessionStore = new WalletSessionStore();
