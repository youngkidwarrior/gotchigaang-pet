import '../styles/globals.css';
import useWeb3Modal from '/hooks/useWeb3Modal';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const { web3Modal, web3Provider, connect, address } = useWeb3Modal();

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, [connect, web3Modal]);
  return (
    <Component {...pageProps} address={address} web3Provider={web3Provider} />
  );
}

export default MyApp;
