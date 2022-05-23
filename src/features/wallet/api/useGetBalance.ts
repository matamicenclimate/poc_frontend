import { algoIndexer } from '@/lib/algoIndexer';
import { useQuery } from 'react-query';
import { IndexerAccount } from '../types';

function getBalances(address: string): Promise<IndexerAccount> {
  return algoIndexer.get(`/accounts/${address}`);
}

// si no tenemos el address desactivamos la llamada
export const useGetBalance = (address: string | null) => {
  return useQuery(['account', address], () => getBalances(address as string), {
    enabled: !!address,
  });
};
