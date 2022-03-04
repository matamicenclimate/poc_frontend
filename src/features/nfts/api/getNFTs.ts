import { httpClient } from '@/lib/httpClient';
import { useQuery } from 'react-query';
import { nftKeys } from '.';

function fetchNFTs(): Promise<any[]> {
  return httpClient.get(`/nfts`);
}
export function getNFTs() {
  return useQuery(nftKeys.lists(), () => fetchNFTs());
}
