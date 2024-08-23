"use client";
import { useRecoilState } from "recoil";
import { mnemonicSol, solWalletsState } from "../state/state";
import { PrimaryButton } from "./Button";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { useState } from "react";
import { Mnemonic } from "./Mnemonic";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { Wallets } from "./Wallets";
import bs58 from "bs58";

export function SolDashboard() {
  const [mnemonic, setMnemonic] = useRecoilState(mnemonicSol);
  const [solWallets, setSolWallets] = useRecoilState(solWalletsState);
  const [solWalletCount, setSolWalletCount] = useState(0);
  const generateSeed = () => {
    const mnemo = generateMnemonic();
    setMnemonic(mnemo);
  };

  const addWallet = () => {
    try {
      const seed = mnemonicToSeedSync(mnemonic);
      const path = `m/44'/501'/${solWalletCount}'/0'`;
      const { key: derivedSeed } = derivePath(path, seed.toString("hex"));
      const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const privateKeyBase58 = bs58.encode(secretKey);
      const publicKey = Keypair.fromSecretKey(secretKey).publicKey.toBase58();
      setSolWalletCount((prev) => prev + 1);
      setSolWallets((prev) => [
        ...prev,
        {
          publicKey,
          privateKey: privateKeyBase58,
        },
      ]);
    } catch (error) {
      console.error("Error in addWallet:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-4 space-y-4">
        <h3 className="text-xl font-semibold">
          Create Solana Public Crypto Key-Pairs
        </h3>
        <p className="text-lg text-slate-400 italic">
          You can create multiple wallets after generating single seed phrase.
        </p>
        {mnemonic ? (
          <PrimaryButton onClick={addWallet}>Add Wallet</PrimaryButton>
        ) : (
          <PrimaryButton onClick={generateSeed}>
            Generate Seed Phrase
          </PrimaryButton>
        )}
        {mnemonic && <Mnemonic mnemonic={mnemonic} />}
      </div>
      <div className=" mx-12 my-4">
        {solWallets.length > 0 && <Wallets wallets={solWallets} />}
      </div>
    </div>
  );
}
