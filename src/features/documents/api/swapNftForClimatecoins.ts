import { documentKeys, CarbonDocument } from './index';
import { httpClient } from '@/lib/httpClient';
import { useMutation, useQueryClient } from 'react-query';
import { useAlert } from 'react-alert';
import { getClient } from '@/lib/algosdk';
import algosdk, { OnApplicationComplete, waitForConfirmation } from 'algosdk';
import { magiclink } from '@/lib/magiclink';
import { Buffer } from 'buffer';
import { getMethodByName, vaultContract } from '@/contracts/vault';

async function handleSwap(
  address: string,
  nftAsaId: number,
  nftSupply: number,
  documentId: string
): Promise<any> {
  console.log('swapping...');

  if (!address) return;
  if (!nftAsaId) return;
  if (!nftSupply) return;

  console.log('opting in...');
  const suggestedParams = await getClient().getTransactionParams().do();

  suggestedParams.fee = suggestedParams.fee * 2;

  const unfreezeTxn = algosdk.makeApplicationCallTxnFromObject({
    from: address,
    appIndex: vaultContract.networks['testnet'].appID,
    // the atc appends the assets to the foreignAssets and passes the index of the asses in the appArgs
    appArgs: [getMethodByName('unfreeze_nft').getSelector(), algosdk.encodeUint64(0)],
    foreignAssets: [nftAsaId],
    onComplete: OnApplicationComplete.NoOpOC,
    suggestedParams,
  });

  const transferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: address,
    // the atc appends the assets to the foreignAssets and passes the index of the asses in the appArgs
    assetIndex: nftAsaId,
    to: algosdk.getApplicationAddress(vaultContract.networks['testnet'].appID),
    amount: nftSupply,
    suggestedParams,
  });

  const swapTxn = algosdk.makeApplicationCallTxnFromObject({
    from: address,
    appIndex: vaultContract.networks['testnet'].appID,
    // the atc appends the assets to the foreignAssets and passes the index of the asses in the appArgs
    appArgs: [getMethodByName('swap_nft_to_fungible').getSelector(), algosdk.encodeUint64(1)],
    foreignAssets: [Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID), nftAsaId],
    onComplete: OnApplicationComplete.NoOpOC,
    suggestedParams,
  });
  console.log({ txn: swapTxn });
  algosdk.assignGroupID([unfreezeTxn, transferTxn, swapTxn]);

  const signedTxn = await magiclink.algorand.signGroupTransactionV2([
    { txn: Buffer.from(unfreezeTxn.toByte()).toString('base64') },
    { txn: Buffer.from(transferTxn.toByte()).toString('base64') },
    { txn: Buffer.from(swapTxn.toByte()).toString('base64') },
  ]);

  const blob = signedTxn.map((txn: string) => new Uint8Array(Buffer.from(txn, 'base64')));
  const { txId } = await getClient().sendRawTransaction(blob).do();
  const result = await waitForConfirmation(getClient(), txId, 3);

  console.log({ result });

  return httpClient.post(`/carbon-documents/${documentId}/swap`);
}

export function swapNftForClimatecoins() {
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
        queryClient.invalidateQueries(documentKeys.detail(data._id as string));
        alert.success('Asset swapped succesfully');
      },
      onError: () => {
        alert.error('Error claiming nft');
      },
    }
  );
}
