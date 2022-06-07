import { useQuery } from 'react-query';

import { httpClient } from '@/lib/httpClient';

import { nftKeys } from '.';

function fetchNFTs(): Promise<any[]> {
  return httpClient.get(`/nfts`);
}
export function useGetNFTs() {
  return useQuery(nftKeys.lists(), () => fetchNFTs());
}
