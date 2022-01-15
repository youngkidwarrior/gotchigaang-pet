import Head from 'next/head';
import Image from 'next/image';
import { Header } from '/components/Header';
import styles from '../styles/Home.module.css';
import useWeb3Modal from '/hooks/useWeb3Modal';
import { useGaangMembers } from '/hooks/useGaangMembers';

export default function Home() {
  const { address } = useWeb3Modal();
  const { gaang, loading } = useGaangMembers();

  return (
    <div className="px-8 ">
      <Head>
        <title>Pet Gaang</title>
        <meta name="description" content="Pet your gotchis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex flex-col justify-center items-center"></main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
