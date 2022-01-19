import Head from 'next/head';
import Image from 'next/image';
import { Header } from '/components/Header';
import styles from '../styles/Home.module.css';
import useWeb3Modal from '/hooks/useWeb3Modal';
import { useGaangMembers } from '/hooks/useGaangMembers';
import { OnlyGaang } from '/components/OnlyGaang';
import { getGotchiOwners, addGotchiOwner, getGotchis } from '/helpers';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import LazyPetter from '../../contracts/deployments/localhost/LazyPetter.json';

export default function Home({ address, web3Provider }) {
  const { gaang, loading } = useGaangMembers();
  const [lazyPetterContract, setLazyPetterContract] = useState(null);
  const [gotchiOwners, setGotchiOwners] = useState([]);
  console.log('gotchiOwners: ', gotchiOwners);

  const onAddGotchiOwner = async () => {
    await addGotchiOwner(lazyPetterContract, address);
  };

  useEffect(() => {
    if (!lazyPetterContract) return;
    (async () => {
      const gotchiOwners = await getGotchiOwners(lazyPetterContract);
      setGotchiOwners(gotchiOwners);
    })();
  }, [lazyPetterContract]);

  useEffect(() => {
    if (!web3Provider) return;
    const contract = new ethers.Contract(
      LazyPetter.address,
      LazyPetter.abi,
      web3Provider.getSigner()
    );
    console.log('contract: ', contract);
    setLazyPetterContract(contract);
  }, [web3Provider]);

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
        <main className="flex flex-col justify-center items-center">
          <button onClick={onAddGotchiOwner} className="">
            Autopet Gotchis
          </button>
        </main>
      </OnlyGaang>
    </div>
  );
}
