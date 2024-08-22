"use client";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./Button";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "700",
  style: ["normal"],
  subsets: ["latin"],
});

const rob = Roboto({
  weight: "400",
  style: ["italic"],
  subsets: ["latin"],
});

export function Dashboard() {
  const router = useRouter();
  return (
    <div className=" w-full h-screen absolute left-0 top-0 flex flex-col justify-center items-center space-y-4">
      <div className=" flex flex-col justify-center items-center space-y-2">
        <h1 className={`text-3xl font-bold ${roboto.className}`}>
          Web based Wallets
        </h1>
        <p className={`text-slate-500 ${rob.className}`}>
          Create and Access Public Crypto Key-Pairs on multiple blockchains
        </p>
      </div>
      <div>
        <PrimaryButton onClick={() => router.push("/sol")}>
          Solana
        </PrimaryButton>
        <PrimaryButton onClick={() => router.push("/eth")}>
          Ethereum
        </PrimaryButton>
      </div>
    </div>
  );
}
