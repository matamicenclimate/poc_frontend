import algosdk, { waitForConfirmation } from 'algosdk';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';

import { AssetTransfer } from '@/features/wallet';
import { getClient } from '@/lib/algosdk';
import { sw } from '@/lib/sessionWallet';
import { useWalletContext } from '@/providers/Wallet.context';

export function useTransferAsset() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const alert = useAlert();

  const { account } = useWalletContext();

  const transferAsset = async (asaId: number, amount: number, receiverAddress: string) => {
    if (!account?.address) return;
    if (!algosdk.isValidAddress(receiverAddress)) return Promise.reject(t('Transfer.adress.error'));
    const suggestedParams = await getClient().getTransactionParams().do();

    const transactionOptions = {
      from: account?.address,
      to: receiverAddress,
      assetIndex: asaId,
      amount: amount,
      suggestedParams,
    };

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject(transactionOptions);

    const signedTxns = await sw?.signTxn([txn]);
    if (!signedTxns) return Promise.reject(t('Transfer.txn.sign.error'));
    const signedTxn = signedTxns[0];

    const { txId } = await getClient().sendRawTransaction(signedTxn.blob).do();
    await waitForConfirmation(getClient(), txId, 4);
  };

  return useMutation(
    (assetTransfer: AssetTransfer) =>
      transferAsset(assetTransfer.asset['asset-id'], assetTransfer.amount, assetTransfer.receiver),
    {
      onSuccess: (txn) => {
        queryClient.invalidateQueries(['account']);
        alert.success(t('Transfer.asset.send.success'));
      },
      onError: () => {
        alert.error(t('Transfer.asset.send.error'));
      },
    }
  );
}
