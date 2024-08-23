"use client";
import { Form } from "./Form";
import { balanceState, networkState, publicKeyState } from "../state/state";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useEffect } from "react";

export function BalanceCard() {
  const [balance, setBalance] = useRecoilState(balanceState);
  const [publicKey, setPublicKey] = useRecoilState(publicKeyState);
  const [network, setNetwork] = useRecoilState(networkState);
  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    let uri = "";
    let body = {};

    if (network === "solana") {
      uri = process.env.NEXT_PUBLIC_SOLANA_JSON_RPC_URL ?? "";
      body = {
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [publicKey],
      };
    } else if (network === "ethereum") {
      uri = process.env.NEXT_PUBLIC_ETHEREUM_JSON_RPC_URL ?? "";
      body = {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [publicKey, "latest"],
      };
    }

    try {
      const response = await axios.post(uri, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (network === "solana") {
        setBalance(
          (response.data.result.value / Math.pow(10, 9)).toString() + " SOL"
        );
      } else if (network === "ethereum") {
        setBalance(
          (parseInt(response.data.result, 16) / Math.pow(10, 18)).toString() +
            " ETH"
        );
      }
    } catch (error) {
      setBalance("Enter valid public key");
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    // Clean up function to reset the state
    return () => {
      setBalance("Enter public key and press submit to get balance");
    };
  }, [setBalance]);
  return (
    <div className="flex flex-col justify-center items-center rounded-lg p-6 w-2/4 mt-20 bg-slate-100">
      <Form onSubmit={onSubmit} />
      <div className=" flex flex-col justify-center items-center space-y-2">
        <p className="text-xl text-gray-800 font-bold">Balance:</p>
        <p className="text-xl text-gray-700">{balance}</p>
      </div>
    </div>
  );
}
