import { atom } from "recoil";

export const mnemonicSol = atom<string>({
  key: "mnemonicSol",
  default: "",
});
export const mnemonicEth = atom<string>({
  key: "mnemonicEth",
  default: "",
});
export const balanceState = atom<string>({
  key: "balanceState",
  default: "Enter public key and press submit to get balance",
});
export const publicKeyState = atom<string>({
  key: "publicKey",
  default: "",
});
export const networkState = atom<string>({
  key: "networkState",
  default: "solana",
});
export const solWalletsState = atom<
  { publicKey: string; privateKey: string }[]
>({
  key: "solWalletsState",
  default: [],
});
export const ethWalletsState = atom<
  { publicKey: string; privateKey: string }[]
>({
  key: "ethWalletsStates",
  default: [],
});
