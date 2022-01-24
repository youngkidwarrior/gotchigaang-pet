//make a header component with an image and a title that says "Gaang Pet" on the left and a button on the right that says connect
import Image from 'next/image';
import { useState, useEffect } from 'react';
import useWeb3Modal from '/hooks/useWeb3Modal';
import { formatAddress } from '/utils';

export const Header = ({ address }) => {
  const { connect } = useWeb3Modal();

  return (
    <div className="flex justify-between items-center border-b-2 border-gray-100 py-10 px-8 md:justify-start md:space-x-10 bg-header-background bg-top">
      <div className="flex justify-start items-center lg:w-0 lg:flex-1">
        <Image src="/spinGaang.gif" width={50} height={50} />
        <p className="text-3xl text-white font-bold m-0">Petting Gaang</p>
      </div>
      <button
        onClick={connect}
        className="bg-gaangPurple hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        {address ? formatAddress(address) : 'Connect'}
      </button>
    </div>
  );
};
