import { useAlert } from 'react-alert';
import { httpClient } from '@/lib/httpClient';
import { useMutation } from 'react-query';
import { getClient } from '@/lib/algosdk';
import algosdk, { waitForConfirmation } from 'algosdk';
import { magiclink } from '@/lib/magiclink';
import { Buffer } from 'buffer';
import { queryClient } from '@/lib/react-query';
import { CompensationCalculation, compensationKeys } from '../types';
import { useAuth } from '@/lib/auth';

type HandleBurnParams = { userId: string | null | undefined } & CompensationCalculation;

async function handleBurnClimatecoins({
  amount,
  address,
  assets,
  txn: oracleTxN,
  encodedBurnTxn,
  encodedTransferTxn,
  nftIds,
  userId,
}: HandleBurnParams): Promise<any> {
  console.log('burning...');
  if (!address) return Promise.reject('No address');
  if (!userId) return Promise.reject('No user');

  const suggestedParams = await getClient().getTransactionParams().do();
  suggestedParams.fee = suggestedParams.fee * 3;

  // convert the txns to buffers
  const oracleTxnBuffer = Buffer.from(Object.values(oracleTxN));
  const transferTxnBuffer = Buffer.from(Object.values(encodedTransferTxn));
  const burnTxnBuffer = Buffer.from(Object.values(encodedBurnTxn));

  // decode and sign
  const signedTransferTxn = await magiclink.algorand.signTransaction(
    algosdk.decodeUnsignedTransaction(transferTxnBuffer).toByte()
  );
  const signedBurnTxn = await magiclink.algorand.signTransaction(
    algosdk.decodeUnsignedTransaction(burnTxnBuffer).toByte()
  );

  // group them
  const signedTxn = [signedTransferTxn, oracleTxnBuffer, signedBurnTxn];
  console.log({ signedTxn });

  const { txId } = await getClient().sendRawTransaction(signedTxn).do();
  const result = await waitForConfirmation(getClient(), txId, 3);
  console.log({ result, txId });
  const groupId = Buffer.from(result.txn.txn.grp).toString('base64');
  return httpClient.post(`/compensations`, { txnId: groupId, amount, nfts: nftIds, user: userId });
}

export function useBurnClimatecoins() {
  const alert = useAlert();
  const { user } = useAuth();
  return useMutation(
    (burnParams: Omit<HandleBurnParams, 'userId'>) => {
      return handleBurnClimatecoins({
        ...burnParams,
        userId: user?.id,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['account']);
        queryClient.invalidateQueries(compensationKeys.lists());
        alert.success('Climatecoins compensated succesfully');
      },
      onError: () => {
        alert.error('Error burning climatecoins');
      },
    }
  );
}