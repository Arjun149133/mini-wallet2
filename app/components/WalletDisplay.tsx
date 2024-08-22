import { useEffect, useRef } from "react";
import { FaRegCopy } from "react-icons/fa6";
export function WalletDisplay({
  index,
  publicKey,
  privateKey,
}: {
  index: number;
  publicKey: string;
  privateKey: string;
}) {
  const newWalletRef = useRef<HTMLDivElement>(null);

  const truncateKey = (key: string) => {
    if (key.length <= 10) return key; // In case the key is very short
    return `${key.slice(0, 3)}...${key.slice(-3)}`;
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    if (newWalletRef.current) {
      newWalletRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [index]);
  return (
    <div
      ref={newWalletRef}
      className=" flex flex-col space-y-2 p-4 rounded-md bg-slate-200 "
    >
      <h1 className="font-semibold">Wallet {index}</h1>
      <div className=" flex space-x-4 justify-evenly items-center">
        <p className=" font-bold">Public Key:</p>
        <span>{truncateKey(publicKey)}</span>
        <FaRegCopy
          className=" cursor-pointer"
          onClick={() => copyToClipboard(publicKey)}
        />
      </div>
      <div className=" flex space-x-4 justify-evenly items-center">
        <p className=" font-bold">Private Key:</p>
        <span>{truncateKey(privateKey)}</span>
        <FaRegCopy
          className="cursor-pointer"
          onClick={() => copyToClipboard(privateKey)}
        />
      </div>
    </div>
  );
}
