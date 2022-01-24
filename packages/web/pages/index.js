import Head from 'next/head';
import Image from 'next/image';
import { Header } from '/components/Header';
import { useGaangMembers } from '/hooks/useGaangMembers';
import { OnlyGaang } from '/components/OnlyGaang';
import { getGotchiOwners, addGotchiOwner, getGotchis } from '/helpers';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import LazyPetter from '../../contracts/deployments/polygon/LazyPetter.json';
import { useAavegotchiContract } from '../hooks/useAavegotchi';
import { useLazyPetterContract } from '../hooks/useLazyPetter';
import usePoller from '../hooks/usePoller';
import { fetchGotchiSVG } from '../utils';
import { Gotchi } from '../components/Gotchi';
import { useCallback } from 'react';

export default function Home({ address, web3Provider }) {
  const { gaang, loading } = useGaangMembers();
  const aavegotchiContract = useAavegotchiContract(web3Provider);
  const lazyPetterContract = useLazyPetterContract(web3Provider);
  const [gotchiOwners, setGotchiOwners] = useState([]);
  const [isGotchiOwner, setIsGotchiOwner] = useState(false);
  const [isPetOperator, setIsPetOperator] = useState(false);
  const [gotchis, setGotchis] = useState([]);
  const [gotchiSVGs, setGotchiSVGs] = useState([]);

  const onAddGotchiOwner = async () => {
    const tx = await addGotchiOwner(lazyPetterContract, address);
    if (tx.status) {
      getGotchiOwners();
    }
  };

  const onSetPetOperator = async () => {
    const tx = await aavegotchiContract.setPetOperatorForAll(
      LazyPetter.address,
      true
    );
    if (tx.status) {
      console.log('tx.status: ', tx.status);

      setIsPetOperator(true);
    }
  };

  const getIsPetOperator = async () => {
    if (!aavegotchiContract) return;
    const isOperator = await aavegotchiContract.isPetOperatorForAll(
      address,
      LazyPetter.address
    );
    setIsPetOperator(isOperator);
  };

  const getGotchiOwners = useCallback(async () => {
    if (!lazyPetterContract) return;
    const gotchiOwners = await lazyPetterContract.getGotchiOwners();
    const isGotchiOwner = gotchiOwners.includes(address);
    setIsGotchiOwner(isGotchiOwner);
    setGotchiOwners(gotchiOwners);
  }, [lazyPetterContract, address]);

  const getGotchis = useCallback(async () => {
    if (!aavegotchiContract) return;
    let allGotchis = [];
    for (let i = 0; i < gotchiOwners.length; i++) {
      const g = await aavegotchiContract.tokenIdsOfOwner(gotchiOwners[i]);
      allGotchis = [...allGotchis, ...g];
    }
    setGotchis(allGotchis);
  }, [gotchiOwners, aavegotchiContract]);

  const getGotchiSVGs = useCallback(async () => {
    if (!aavegotchiContract || !gotchis) return;
    let allGotchiSVGs = [];
    for (let i = 0; i < gotchis.length; i++) {
      const {
        data: { aavegotchis },
      } = await fetchGotchiSVG(gotchis[i]);
      allGotchiSVGs.push(...aavegotchis);
    }
    setGotchiSVGs(allGotchiSVGs);
  }, [gotchis, aavegotchiContract]);

  useEffect(() => {
    if (!aavegotchiContract) return;
    (async () => {
      const isOperator = await aavegotchiContract.isPetOperatorForAll(
        address,
        LazyPetter.address
      );
      setIsPetOperator(isOperator);
    })();
  }, [aavegotchiContract, address]);

  usePoller(() => {
    if (isGotchiOwner) {
      getGotchis();
      getGotchiSVGs();
    }
    if (!web3Provider || isGotchiOwner) return;
    getGotchiOwners();
    getIsPetOperator();
  }, 1999);

  const enrollButton = (() => {
    if (isGotchiOwner) return;
    const buttonFunction = isPetOperator ? onAddGotchiOwner : onSetPetOperator;
    return (
      <button
        onClick={buttonFunction}
        className="bg-gaangPurple hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        {isPetOperator ? 'Add Gotchi Owner' : 'Set Pet Operator'}
      </button>
    );
  })();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" ">
      <Head>
        <title>Pet Gaang</title>
        <meta name="description" content="Pet your gotchis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header web3Provider={web3Provider} address={address} />
      <OnlyGaang gaangMembers={gaang} address={address}>
        <main className="flex flex-col justify-center items-center pt-10">
          {!address ? <div>Loading...</div> : <>{enrollButton}</>}

          {gotchiSVGs.length > 0 ? (
            <div>
              <p className="text-3xl text-center">Aavegotchis in the Gaang</p>
              <div className="flex flex-wrap justify-center items-center">
                {gotchiSVGs.map((gotchi, i) => {
                  return <Gotchi key={i} svg={gotchi.svg} />;
                })}
              </div>
            </div>
          ) : (
            <Image src="/spinGaang.gif" width={50} height={50} />
          )}
        </main>
      </OnlyGaang>
    </div>
  );
}
