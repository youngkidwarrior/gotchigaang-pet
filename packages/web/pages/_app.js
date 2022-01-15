import '../styles/globals.css'
import useWeb3Modal from '/hooks/useWeb3Modal';
import { useEffect } from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const { web3Modal, connect } = useWeb3Modal();
  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, [connect, web3Modal]);
  return <Component {...pageProps} />
}

export default MyApp
