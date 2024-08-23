"use client";
import { useRecoilState } from "recoil";
import { mnemonicEth } from "../state/state";
import { PrimaryButton } from "./Button";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { useState } from "react";
import { Mnemonic } from "./Mnemonic";
import { Wallets } from "./Wallets";
import { ethers } from "ethers";

export function EthDashboard() {
  const [mnemonic, setMnemonic] = useRecoilState(mnemonicEth);
  const [ethWallets, setEthWallets] = useState<
    { publicKey: string; privateKey: string }[]
  >([]);
  const [ethWalletCount, setEthWalletCount] = useState(0);
  const generateSeed = () => {
    const mnemo = generateMnemonic();
    setMnemonic(mnemo);
  };

  const addEthereumWallet = () => {
    try {
      const seed = mnemonicToSeedSync(mnemonic);
      const node = ethers.HDNodeWallet.fromSeed(seed);

      const derivedNode = node.derivePath(`m/44'/60'/${ethWalletCount}'/0'`);

      const publicKey = derivedNode.address;
      const privateKey = derivedNode.privateKey;

      setEthWalletCount((prev) => prev + 1);
      setEthWallets((prev) => [
        ...prev,
        {
          publicKey,
          privateKey,
        },
      ]);
    } catch (error) {
      console.error("Error in addEthereumWallet:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-4 space-y-4">
        <h3 className="text-xl font-semibold">
          Create Ethereum Public Crypto Key-Pairs
        </h3>
        <p className="text-lg text-slate-400 italic">
          You can create multiple wallets after generating single seed phrase.
        </p>
        {mnemonic ? (
          <PrimaryButton onClick={addEthereumWallet}>Add Wallet</PrimaryButton>
        ) : (
          <PrimaryButton onClick={generateSeed}>
            Generate Seed Phrase
          </PrimaryButton>
        )}
        {mnemonic && <Mnemonic mnemonic={mnemonic} />}
      </div>
      <div className=" mx-12 my-4">
        {ethWallets.length > 0 && <Wallets wallets={ethWallets} />}
      </div>
    </div>
  );
}
