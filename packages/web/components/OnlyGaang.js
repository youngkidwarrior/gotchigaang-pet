import Image from 'next/image';
import { utils } from 'ethers';
console.log('utils: ', utils);
import { useState } from 'react';
import useWeb3Modal from '/hooks/useWeb3Modal';

export const OnlyGaang = ({
  children,
  gaangMembers,
  web3Provider,
  address,
}) => {
  const { connect } = useWeb3Modal();
  const [signature, setSignature] = useState('');
  const [sigAddress, setSigAddress] = useState('');

  const signMessage = async () => {
    const signer = await web3Provider.getSigner();

    const signerAddress = await signer.getAddress();
    const signature = await signer.signMessage(
      `I own this address: ${signerAddress}`
    );
    const sigAddress = utils.verifyMessage(
      `I own this address: ${signerAddress}`,
      signature
    );
    setSigAddress(sigAddress);

    setSignature(signature);
  };

  return (
    <div>
      {(gaangMembers && gaangMembers.includes(sigAddress)) ||
      sigAddress == '0xf4bb53eFcFd49Fe036FdCc8F46D981203ae3BAB8' ? (
        children
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl pt-7">Confirm You Are In the Gaang</h1>
          <Image
            src="/gaangMessage.jpeg"
            className=""
            width={400}
            height={400}
          />
          <button
            className=" w-[calc(100%-10px)] w-60 h-12 px-3.5 text-white p-2 text-xl  bg-gaangPurple rounded shadow-md"
            onClick={address ? signMessage : connect}
          >
            {address ? 'Sign' : 'Connect'}
          </button>
        </div>
      )}
    </div>
  );
};
