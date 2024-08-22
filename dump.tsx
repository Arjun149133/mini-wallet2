"use client";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { useState } from "react";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { Hero } from "./components/Hero";
import { Mnemonic } from "./components/Mnemonic";
import { Wallets } from "./components/Wallets";

export default function Home() {
  const [mnemonic, setMnemonic] = useState("");
  const [wallets, setWallets] = useState([{ publicKey: "", privateKey: "" }]);
  const [walletCount, setWalletCount] = useState(0);

  const generateSeed = () => {
    const mnemo = generateMnemonic();
    setMnemonic(mnemo);
  };

  const addWallet = () => {
    try {
      const seed = mnemonicToSeedSync(mnemonic);

      const path = `m/44'/501'/${walletCount}'/0'`; // This is the derivation path

      const { key: derivedSeed } = derivePath(path, seed.toString("hex"));

      const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

      const publicKey = Keypair.fromSecretKey(secretKey).publicKey.toBase58();

      setWalletCount((prev) => prev + 1);
      setWallets((prev) => [
        ...prev,
        { publicKey, privateKey: Buffer.from(secretKey).toString("hex") },
      ]);
    } catch (error) {
      console.error("Error in addWallet:", error);
    }
  };

  return (
    <div className="flex flex-col items-center text-white">
      <div className=" w-2/3 border-x border-slate-400 h-screen overflow-y-auto no-scrollbar">
        <Hero
          generateSeed={generateSeed}
          addWallet={addWallet}
          mnemonic={mnemonic}
        />
        <Mnemonic mnemonic={mnemonic} />
        <Wallets wallets={wallets} />
      </div>
    </div>
  );
}
