export function Mnemonic({ mnemonic }: { mnemonic: string }) {
  return (
    <div className=" flex items-center justify-center pt-4 space-x-4">
      <h3 className=" text-xl font-semibold">Mnemonic: </h3>
      <div>{mnemonic}</div>
    </div>
  );
}
