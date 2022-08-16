import { Transaction, waitForConfirmation } from 'algosdk';
import { useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';

import { accountKeys, useOptinToAsset } from '@/features/wallet';
import { getClient } from '@/lib/algosdk';
import { httpClient } from '@/lib/httpClient';
import { queryClient } from '@/lib/react-query';
import { sw } from '@/lib/sessionWallet';

import { CarbonDocument, documentKeys } from '../types';

async function claimFromDocument(
  documentId: string,
  email: string,
  optinTxn: Transaction | undefined
): Promise<CarbonDocument> {
  if (optinTxn) {
    const signedTxns = await sw?.signTxn([optinTxn]);
    if (!signedTxns) return Promise.reject('Transaction not signed!');
    const signedTxn = signedTxns[0];

    const { txId } = await getClient().sendRawTransaction(signedTxn.blob).do();
    await waitForConfirmation(getClient(), txId, 3);
    await queryClient.invalidateQueries(accountKeys.all);
  }
  return httpClient.post(`/carbon-documents/${documentId}/claim`, { email });
}

export function useClaimNftFromDocument() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const optinToAsset = useOptinToAsset();

  return useMutation(
    ({ email, documentId, assetId }: { documentId: string; email: string; assetId: number }) =>
      optinToAsset
        .mutateAsync(assetId)
        .then((txn: Transaction | undefined) => claimFromDocument(documentId, email, txn)),
    {
      onSuccess: (data: CarbonDocument) => {
        queryClient.invalidateQueries(documentKeys.detail(data._id as string));
        queryClient.invalidateQueries(accountKeys.all);
        alert.success('Asset claimed succesfully');
      },
      onError: () => {
        alert.error('Error claiming nft');
      },
    }
  );
}
