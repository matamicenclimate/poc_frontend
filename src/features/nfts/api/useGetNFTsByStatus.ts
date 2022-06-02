import { httpClient } from '@/lib/httpClient';
import { useQuery } from 'react-query';
import { nftKeys } from '.';

function fetchNFTs(filter: Record<string, string>): Promise<any[]> {
  const params = new URLSearchParams(filter).toString();
  return httpClient.get(`/nfts?${params}`);
}
export function useGetNFTsByStatus(filter: { status?: string; nft_type?: string }) {
  const parsed = {
    ...filter,
  };
  return useQuery(nftKeys.status(JSON.stringify(filter)), () => fetchNFTs(parsed));
}
