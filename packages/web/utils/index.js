import { ethers } from 'ethers';
import AAVEGOTCHI_ABI from './aavegotchi.json';
import LAZY_PETTER from '../../contracts/deployments/polygon/LazyPetter.json';

const UTF8_FORMAT = 'utf8';
const BASE64_FORMAT = 'base64';

const GOTCHISVG_GRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-svg';

export const AAVEGOTCHI_ADDRESS = '0x86935F11C86623deC8a25696E1C19a8659CbF95d';

export const formatAddress = (address) => {
  return address.slice(0, 5) + '...' + address.slice(-4);
};

export function isAddress(value) {
  try {
    ethers.utils.getAddress(value);
    return true;
  } catch {
    return false;
  }
}

export function getContract(address, ABI, provider) {
  if (!isAddress(address) || address === ethers.constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new ethers.Contract(address, ABI, provider);
}

export function getAavegotchiContract(provider) {
  return getContract(AAVEGOTCHI_ADDRESS, AAVEGOTCHI_ABI, provider);
}

export function getLazyPetterContract(provider) {
  return getContract(LAZY_PETTER.address, LAZY_PETTER.abi, provider);
}

export async function fetchGotchiSVG(id) {
  return await (
    await fetch(`${GOTCHISVG_GRAPH_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
        aavegotchis(where: { id: ${id} }) {
          id
          svg
        }
      }`,
      }),
    })
  ).json();
}
