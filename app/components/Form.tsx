import { useRecoilState } from "recoil";
import { networkState, publicKeyState } from "../state/state";

export function Form({
  onSubmit,
}: {
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const [publicKey, setPublicKey] = useRecoilState(publicKeyState);
  const [network, setNetwork] = useRecoilState(networkState);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNetwork(e.target.value); // Set the network state to the selected value
  };
  return (
    <form className=" flex justify-center items-center max-w-sm mx-auto space-x-2 mb-5">
      <div className=" flex">
        <select value={network} onChange={handleChange}>
          <option value="solana">solana</option>
          <option value="ethereum">ethereum</option>
        </select>
      </div>
      <div className="">
        <input
          type="text"
          id="publicKey"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter public key"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={onSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
