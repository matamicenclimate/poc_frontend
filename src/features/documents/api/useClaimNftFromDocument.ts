import { CarbonDocument, documentKeys } from '../types';
import { httpClient } from '@/lib/httpClient';
import { useMutation, useQueryClient } from 'react-query';
import { useAlert } from 'react-alert';
import { getClient } from '@/lib/algosdk';
import algosdk, { waitForConfirmation } from 'algosdk';
import { magiclink } from '@/lib/magiclink';
import { Buffer } from 'buffer';
import { accountKeys } from '@/features/wallet';

async function claimFromDocument(
  documentId: string,
  email: string,
  address: string,
  assetId: number
): Promise<CarbonDocument> {
  console.log('opting in...');
  const suggestedParams = await getClient().getTransactionParams().do();

  const transactionOptions = {
    from: address,
    to: address,
    assetIndex: assetId,
    amount: 0, // this is an optinTxn so amount has to be 0
    suggestedParams,
  };
  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject(transactionOptions);

  const signedTxn = await magiclink.algorand.signGroupTransactionV2([
    { txn: Buffer.from(txn.toByte()).toString('base64') },
  ]);

  const blob = signedTxn.map((txn: string) => new Uint8Array(Buffer.from(txn, 'base64')));
  const { txId } = await getClient().sendRawTransaction(blob).do();
  const result = await waitForConfirmation(getClient(), txId, 3);

  console.log({ result });
  return httpClient.post(`/carbon-documents/${documentId}/claim`, { email });
}

export function useClaimNftFromDocument() {
  const queryClient = useQueryClient();
  const alert = useAlert();

  return useMutation(
    ({
      email,
      documentId,
      assetId,
      address,
    }: {
      documentId: string;
      email: string;
      assetId: number;
      address: string;
    }) => claimFromDocument(documentId, email, address, assetId),
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
