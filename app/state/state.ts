import { atom } from "recoil";

export const mnemonicSol = atom<string>({
  key: "mnemonicSol",
  default: "",
});
export const mnemonicEth = atom<string>({
  key: "mnemonicEth",
  default: "",
});
