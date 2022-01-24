import Image from 'next/image';

import useWeb3Modal from '/hooks/useWeb3Modal';

export const OnlyGaang = ({ children, gaangMembers, address }) => {
  const { connect } = useWeb3Modal();

  const goToDao = () => {
    window.location.href =
      'https://app.daohaus.club/dao/0x89/0xb60374ae550f6ab6d18e7c9cfafa04ff310235c1';
  };

  return (
    <div>
      {gaangMembers && address && gaangMembers.includes(address) ? (
        children
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl pt-7 align-center">Must Be In the Gaang</h1>
          <Image
            src="/gaangMessage.jpeg"
            className=""
            width={400}
            height={400}
          />
          <button
            className=" w-[calc(100%-10px)] w-60 h-12 px-3.5 text-white p-2 text-xl  bg-gaangPurple rounded shadow-md"
            onClick={address ? goToDao : connect}
          >
            {address ? 'Go to DAO' : 'Connect'}
          </button>
        </div>
      )}
    </div>
  );
};
