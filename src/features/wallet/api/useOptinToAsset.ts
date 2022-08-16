import algosdk, { Transaction } from 'algosdk';
import { useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';

import { getClient } from '@/lib/algosdk';
import { useWalletContext } from '@/providers/Wallet.context';

export function useOptinToAsset() {
  const queryClient = useQueryClient();
  const alert = useAlert();

  const { account, hasOptedIn } = useWalletContext();

  const optinToAsset = async (asaId: number): Promise<Transaction | undefined> => {
    // create the asset accept transaction

    if (hasOptedIn(asaId)) return Promise.resolve(undefined);
    if (!account?.address) return;
    const suggestedParams = await getClient().getTransactionParams().do();

    const transactionOptions = {
      from: account?.address,
      to: account?.address,
      assetIndex: asaId,
      amount: 0, // this is an optinTxn so amount has to be 0
      suggestedParams,
    };

    return algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject(transactionOptions);
  };

  return useMutation((assetId: number) => optinToAsset(assetId), {
    onSuccess: (txn) => {
      queryClient.invalidateQueries(['account']);
    },
    onError: () => {
      alert.error('Error creating the transaction');
    },
  });
}
