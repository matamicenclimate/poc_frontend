import algosdk, { OnApplicationComplete, waitForConfirmation } from 'algosdk';
import { Buffer } from 'buffer';
import { useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';

import { CLIMATECOIN_ASA_ID, VAULT_CONTRACT_ID } from '@/config';
import { getSelector } from '@/contracts/vault';
import { accountKeys } from '@/features/wallet';
import { getClient } from '@/lib/algosdk';
import { httpClient } from '@/lib/httpClient';
import { magiclink } from '@/lib/magiclink';

import { CarbonDocument, documentKeys } from '../types';

async function handleSwap(
  address: string,
  nftAsaId: number,
  nftSupply: number,
  documentId: string
): Promise<CarbonDocument> {
  console.log('swapping...');

  if (!address) return Promise.reject('No address');
  if (!nftAsaId) return Promise.reject('No ASA id');
  if (!nftSupply) return Promise.reject('No nftSupply');

  console.log('opting in...');
  const suggestedParams = await getClient().getTransactionParams().do();

  suggestedParams.fee = suggestedParams.fee * 3;

  const unfreezeTxn = algosdk.makeApplicationCallTxnFromObject({
    from: address,
    appIndex: VAULT_CONTRACT_ID,
    // the atc appends the assets to the foreignAssets and passes the index of the asses in the appArgs
    appArgs: [getSelector('unfreeze_nft'), algosdk.encodeUint64(0)],
    foreignAssets: [nftAsaId],
    onComplete: OnApplicationComplete.NoOpOC,
    suggestedParams,
  });

  const transferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: address,
    // the atc appends the assets to the foreignAssets and passes the index of the asses in the appArgs
    assetIndex: nftAsaId,
    to: algosdk.getApplicationAddress(VAULT_CONTRACT_ID),
    amount: nftSupply,
    suggestedParams,
  });

  const swapTxn = algosdk.makeApplicationCallTxnFromObject({
    from: address,
    appIndex: VAULT_CONTRACT_ID,
    // the atc appends the assets to the foreignAssets and passes the index of the asses in the appArgs
    appArgs: [getSelector('swap_nft_to_fungible'), algosdk.encodeUint64(1)],
    foreignAssets: [Number(CLIMATECOIN_ASA_ID), nftAsaId],
    onComplete: OnApplicationComplete.NoOpOC,
    suggestedParams,
  });

  algosdk.assignGroupID([unfreezeTxn, transferTxn, swapTxn]);

  /** this is silly because magiclink doest support the atomic transaction composer **/
  const signedTxn = await magiclink.algorand.signGroupTransactionV2([
    { txn: Buffer.from(unfreezeTxn.toByte()).toString('base64') },
    { txn: Buffer.from(transferTxn.toByte()).toString('base64') },
    { txn: Buffer.from(swapTxn.toByte()).toString('base64') },
  ]);

  /** convert it back to a buffer so we can send it **/
  const blob = signedTxn.map((txn: string) => new Uint8Array(Buffer.from(txn, 'base64')));
  const { txId } = await getClient().sendRawTransaction(blob).do();
  const result = await waitForConfirmation(getClient(), txId, 3);

  const groupId = Buffer.from(result.txn.txn.grp).toString('base64');

  return httpClient.post(`/carbon-documents/${documentId}/swap`, {
    txnId: txId,
    isGroup: true,
    groupId: groupId,
  });
}

export function useSwapNftForClimatecoins() {
  const queryClient = useQueryClient();
  const alert = useAlert();

  return useMutation(
    ({
      address,
      nftAsaId,
      nftSupply,
      documentId,
    }: {
      address: string;
      nftAsaId: number;
      nftSupply: number;
      documentId: string;
    }) => handleSwap(address, nftAsaId, nftSupply, documentId),
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
