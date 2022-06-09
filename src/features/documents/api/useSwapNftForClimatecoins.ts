import algosdk from 'algosdk';
import { Buffer } from 'buffer';
import { useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';

import { accountKeys } from '@/features/wallet';
import { httpClient } from '@/lib/httpClient';
import { magiclink } from '@/lib/magiclink';

import { CarbonDocument, documentKeys } from '../types';

async function handleSwap(documentId: string): Promise<CarbonDocument> {
  const unsignedTxns: Buffer[] = await httpClient.get(
    `/carbon-documents/${documentId}/swap/prepare`
  );

  const unsignedTxnBuffers = unsignedTxns.map((txn) => Buffer.from(Object.values(txn)));
  const signedTxnBuffersPromises = unsignedTxnBuffers.map((txn) =>
    magiclink.algorand.signTransaction(algosdk.decodeUnsignedTransaction(txn).toByte())
  );

  const signedTxnBuffers = await Promise.all(signedTxnBuffersPromises);

  return httpClient.post(`/carbon-documents/${documentId}/swap`, {
    signedTxn: signedTxnBuffers,
  });
}

export function useSwapNftForClimatecoins() {
  const queryClient = useQueryClient();
  const alert = useAlert();

  return useMutation(({ documentId }: { documentId: string }) => handleSwap(documentId), {
    onSuccess: (data: CarbonDocument) => {
      if (data._id) {
        queryClient.invalidateQueries(documentKeys.detail(data._id));
      }
      queryClient.invalidateQueries(accountKeys.all);
      alert.success('Asset swapped successfully');
    },
    onError: (e: Error) => {
      alert.error('Error claiming nft');
      console.error(e.message);
    },
  });
}
