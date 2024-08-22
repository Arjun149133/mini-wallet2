import { WalletDisplay } from "./WalletDisplay";

export function Wallets({
  wallets,
}: {
  wallets: { publicKey: string; privateKey: string }[];
}) {
  return (
    <div className=" flex flex-col items-center space-y-4">
      <h3 className=" flex justify-center w-full text-xl font-semibold">
        Wallets
      </h3>
      <div className="grid grid-cols-4 gap-16">
        {wallets.map((wallet, index) => (
          <WalletDisplay
            key={index}
            index={index + 1}
            publicKey={wallet.publicKey}
            privateKey={wallet.privateKey}
          />
        ))}
      </div>
    </div>
  );
}
