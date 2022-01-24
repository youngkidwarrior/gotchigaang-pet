import { useMemo } from 'react';
import { getLazyPetterContract } from '../utils';

export function useLazyPetterContract(provider, withSignerIfPossible = true) {
  return useMemo(() => {
    try {
      return getLazyPetterContract(
        withSignerIfPossible ? provider.getSigner() : provider
      );
    } catch {
      return null;
    }
  }, [withSignerIfPossible, provider]);
}
