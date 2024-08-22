export function Mnemonic({ mnemonic }: { mnemonic: string }) {
  const words = mnemonic.split(" ");

  return (
    <div className=" flex flex-col items-center justify-center p-2 space-x-4 bg-slate-100">
      <h3 className=" text-xl font-semibold my-1 mb-2">Mnemonic: </h3>
      <div className=" grid grid-cols-4 gap-4 blur-sm hover:blur-0">
        {words.map((word, index) => (
          <div
            key={index}
            className=" bg-slate-100 text-slate-500 px-2 py-1 rounded-md space-x-2"
          >
            <span>{index + 1}.</span>
            <span>{word}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
