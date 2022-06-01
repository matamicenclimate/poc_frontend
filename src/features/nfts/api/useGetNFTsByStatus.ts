import { httpClient } from '@/lib/httpClient';
import { useQuery } from 'react-query';
import { nftKeys } from '.';

function fetchNFTs(filter: Record<string, string>): Promise<any[]> {
  const params = new URLSearchParams(filter).toString();
  return httpClient.get(`/nfts?${params}`);
}
export function useGetNFTsByStatus(status: string) {
  const parsed = {
    status,
  };
  return useQuery(nftKeys.status(status), () => fetchNFTs(parsed));
}
