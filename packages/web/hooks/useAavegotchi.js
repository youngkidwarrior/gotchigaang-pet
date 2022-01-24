import { useMemo } from 'react';
import { getAavegotchiContract } from '../utils';

export function useAavegotchiContract(provider, withSignerIfPossible = true) {
  return useMemo(() => {
    try {
      return getAavegotchiContract(
        withSignerIfPossible ? provider.getSigner() : provider
      );
    } catch {
      return null;
    }
  }, [withSignerIfPossible, provider]);
}