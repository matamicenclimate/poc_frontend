import algosdk, { waitForConfirmation } from 'algosdk';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';

import { Payment } from '@/features/wallet';
import { getClient } from '@/lib/algosdk';
import { sw } from '@/lib/sessionWallet';
import { useWalletContext } from '@/providers/Wallet.context';

export function usePayment() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const alert = useAlert();

  const { account } = useWalletContext();

  const pay = async (amount: number, receiverAddress: string) => {
    if (!account?.address) return;
    if (!algosdk.isValidAddress(receiverAddress)) return Promise.reject(t('Payment.adress.error'));

    const suggestedParams = await getClient().getTransactionParams().do();

    const transactionOptions = {
      from: account?.address,
      to: receiverAddress,
      amount: amount,
      suggestedParams,
    };

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject(transactionOptions);

    const signedTxns = await sw?.signTxn([txn]);
    if (!signedTxns) return Promise.reject(t('Payment.txn.sign.error'));
    const signedTxn = signedTxns[0];

    const { txId } = await getClient().sendRawTransaction(signedTxn.blob).do();
    await waitForConfirmation(getClient(), txId, 4);
  };

  return useMutation((payment: Payment) => pay(payment.amount, payment.receiver), {
    onSuccess: (txn) => {
      queryClient.invalidateQueries(['account']);
      alert.success(t('Payment.algos.sent.success'));
    },
    onError: () => {
      alert.error(t('Payment.algos.sent.error'));
    },
  });
}
