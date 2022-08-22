import { useQuery } from 'react-query';

import { algoIndexer } from '@/lib/algoIndexer';

import { IndexerAccount, IndexerAccountAssets } from '../types';
import { accountKeys } from '.';

function getBalances(address: string): Promise<IndexerAccount> {
  return algoIndexer.get(`/accounts/${address}`);
}

function getAssetDetails(address: string): Promise<IndexerAccountAssets> {
  return algoIndexer.get(`/accounts/${address}/assets`);
}

// Si se necesita buscar assets específicos
async function getAccountBalances(address: string): Promise<IndexerAccount> {
  const [accountQuery, assetsQuery] = await Promise.all([
    getBalances(address),
    getAssetDetails(address),
  ]);
  accountQuery.account.assets = assetsQuery.assets;
  return Promise.resolve(accountQuery);
}

// si no tenemos el address desactivamos la llamada
export const useGetBalance = (address: string | null) => {
  return useQuery(accountKeys.detail(address as string), () => getBalances(address as string), {
    enabled: !!address,
  });
};
