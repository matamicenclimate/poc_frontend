import { useQuery } from 'react-query';

import { algoIndexer } from '@/lib/algoIndexer';
import { useAuth } from '@/lib/auth';

import { IndexerAssets } from '../types';
import { accountKeys } from '.';


function getAssets(address: string, limit: number): Promise<IndexerAssets> {
  return algoIndexer.get(`/accounts/${address}/assets?limit=${limit}`);
}

export const useGetAssets = (limit: number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const auth = process.env.NODE_ENV !== 'test' ? useAuth() : () => ({});
  // @ts-expect-error need to mock this better
  const address = auth.user.publicAddress;
  return useQuery(accountKeys.assets(limit), () => getAssets(address, limit));
};
