import { useQuery } from 'react-query';

import { magiclink } from '@/lib/magiclink';

function fetchWallet(): Promise<string> {
  return magiclink.algorand.getWallet();
}

export function useGetWallet() {
  return useQuery(['wallet'], fetchWallet, { refetchOnWindowFocus: false });
}
