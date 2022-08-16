import algosdk, { Transaction } from 'algosdk';
import { Buffer } from 'buffer';
import { useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';

import { accountKeys, useOptinToAsset } from '@/features/wallet';
import { httpClient } from '@/lib/httpClient';
import { sw } from '@/lib/sessionWallet';

import { CarbonDocument, documentKeys } from '../types';

async function handleSwap(
  documentId: string,
  optinTxn: Transaction | undefined
): Promise<CarbonDocument> {
  const unsignedTxnsBuffers: Buffer[] = await httpClient.get(
    `/carbon-documents/${documentId}/swap/prepare`
  );

  const unsignedTxns = unsignedTxnsBuffers.map((txn) =>
    algosdk.decodeUnsignedTransaction(Buffer.from(Object.values(txn)))
  );

  if (optinTxn) unsignedTxns.unshift(optinTxn);

  const signedTxns = await sw?.signTxn(unsignedTxns);

  if (!signedTxns) return Promise.reject('Transaction not signed');
  const signedTxnsBlob = signedTxns.map((txn) => txn.blob);

  return httpClient.post(`/carbon-documents/${documentId}/swap`, {
    signedTxn: signedTxnsBlob,
  });
}

export function useSwapNftForClimatecoins() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const optinToAsset = useOptinToAsset();

  return useMutation(
    ({ documentId }: { documentId: string }) =>
      optinToAsset
        .mutateAsync(Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID))
        .then((txn: Transaction | undefined) => handleSwap(documentId, txn)),
    {
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
    }
  );
}
