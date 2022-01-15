//make a header component with an image and a title that says "Gaang Pet" on the left and a button on the right that says connect
import Image from 'next/image';
import useWeb3Modal from '/hooks/useWeb3Modal';
import { formatAddress } from '/utils/web3';

export const Header = () => {
  const { connect, address, web3Provider, disconnect } = useWeb3Modal();
  return (
    <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
      <div className="flex justify-start items-center lg:w-0 lg:flex-1">
        <Image src="/favicon.ico" width={50} height={50} />
        <p className="text-3xl font-bold m-0">Pet Gaang</p>
      </div>
      <button
        onClick={connect}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        {address ? formatAddress(address) : 'Connect'}
      </button>
    </div>
  );
};
