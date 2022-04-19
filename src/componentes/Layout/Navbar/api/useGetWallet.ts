import { useQuery } from 'react-query';
import { httpClient } from '@/lib/httpClient';
import { magiclink } from '@/lib/magiclink';

function fetchWallet(): Promise<string> {
  return magiclink.algorand.getWallet();
}

export function useGetWallet() {
  return useQuery(['wallet'], fetchWallet, { refetchOnWindowFocus: false });
}
