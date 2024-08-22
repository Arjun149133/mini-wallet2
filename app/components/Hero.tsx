import { PrimaryButton } from "./Button";

export function Hero({
  generateSeed,
  addWallet,
  mnemonic,
}: {
  generateSeed: () => void;
  addWallet: () => void;
  mnemonic: string;
}) {
  return (
    <div className=" flex flex-col items-center justify-center pt-4 space-y-4">
      <h3 className=" text-xl font-semibold">Create Public Crypto Key-Pairs</h3>
      <p className=" text-lg text-slate-400 italic">
        You can create multiple wallets after generating single seed phrase.
      </p>
      {mnemonic ? (
        <PrimaryButton onClick={addWallet}>Add Wallet</PrimaryButton>
      ) : (
        <PrimaryButton onClick={generateSeed}>
          Generate Seed Phrase
        </PrimaryButton>
      )}
    </div>
  );
}
