import { useQuery } from 'react-query';

import { algoIndexer } from '@/lib/algoIndexer';

import { IndexerAccount } from '../types';
import { accountKeys } from '.';

function getBalances(address: string): Promise<IndexerAccount> {
  return algoIndexer.get(`/accounts/${address}`);
}

// si no tenemos el address desactivamos la llamada
export const useGetBalance = (address: string | null) => {
  return useQuery(accountKeys.detail(address as string), () => getBalances(address as string), {
    enabled: !!address,
  });
};
