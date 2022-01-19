import Head from 'next/head';
import Image from 'next/image';
import { Header } from '/components/Header';
import styles from '../styles/Home.module.css';
import useWeb3Modal from '/hooks/useWeb3Modal';
import { useGaangMembers } from '/hooks/useGaangMembers';
import { OnlyGaang } from '../components/OnlyGaang';

export default function Home({ address, web3Provider }) {
  const { gaang, loading } = useGaangMembers();

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
      <OnlyGaang
        gaangMembers={gaang}
        web3Provider={web3Provider}
        address={address}
      >
        <main className="flex flex-col justify-center items-center"></main>
      </OnlyGaang>
    </div>
  );
}
