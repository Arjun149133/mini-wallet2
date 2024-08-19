export function WalletDisplay({
  publicKey,
  privateKey,
}: {
  publicKey: string;
  privateKey: string;
}) {
  return (
    <div className=" flex flex-col">
      <div>{publicKey}</div>
      <div className=" w-96 overflow-auto">{privateKey} </div>
    </div>
  );
}
