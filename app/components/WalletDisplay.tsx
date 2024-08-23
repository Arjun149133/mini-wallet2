import { useEffect, useRef } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { DarkButton } from "./Button";
import { useRecoilState } from "recoil";
import { networkState, publicKeyState } from "../state/state";
import { usePathname, useRouter } from "next/navigation";
export function WalletDisplay({
  index,
  publicKey,
  privateKey,
}: {
  index: number;
  publicKey: string;
  privateKey: string;
}) {
  const router = useRouter();
  const path = usePathname();
  const newWalletRef = useRef<HTMLDivElement>(null);
  const [publicState, setPublicState] = useRecoilState(publicKeyState);
  const [network, setNetwork] = useRecoilState(networkState);

  const truncateKey = (key: string) => {
    if (key.length <= 10) return key; // In case the key is very short
    return `${key.slice(0, 3)}...${key.slice(-3)}`;
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleClick = () => {
    setPublicState(publicKey);
    if (path === "/sol") {
      setNetwork("solana");
    } else if (path === "/eth") {
      setNetwork("ethereum");
    }
    router.push("/balance");
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
      <h1 className="font-semibold flex justify-center">Wallet {index}</h1>
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
      <div className=" flex justify-center mt-2">
        <DarkButton onClick={handleClick}>Get Balance</DarkButton>
      </div>
    </div>
  );
}
