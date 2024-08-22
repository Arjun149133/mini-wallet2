import Link from "next/link";

export function Navbar() {
  return (
    <div className=" flex justify-between items-center w-full px-2 mt-3 absolute top-0 left-0 z-50">
      <div className=" cursor-pointer">
        <Link className=" text-2xl font-bold text-slate-500" href="/">
          Wallets.Arj
        </Link>
      </div>
      <div>
        <div className=" space-x-5 mx-5">
          <Link href="/sol">Solana</Link>
          <Link href="/eth">Ethereum</Link>
          <Link href="/balance" className=" font-bold">
            Balance
          </Link>
        </div>
      </div>
    </div>
  );
}
