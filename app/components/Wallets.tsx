import { WalletDisplay } from "./WalletDisplay";

export function Wallets({
  wallets,
}: {
  wallets: { publicKey: string; privateKey: string }[];
}) {
  return (
    <div className=" flex flex-col items-center justify-center pt-4 space-y-4">
      <h3 className=" text-xl font-semibold">Wallets</h3>
      {wallets.map((wallet, index) => (
        <WalletDisplay
          key={index}
          publicKey={wallet.publicKey}
          privateKey={wallet.privateKey}
        />
      ))}
    </div>
  );
}
