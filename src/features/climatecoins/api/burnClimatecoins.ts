import { useAlert } from 'react-alert';
import { httpClient } from '@/lib/httpClient';
import { useMutation } from 'react-query';
import { getClient } from '@/lib/algosdk';
import algosdk, { waitForConfirmation } from 'algosdk';
import { magiclink } from '@/lib/magiclink';
import { Buffer } from 'buffer';
import { queryClient } from '@/lib/react-query';
import { CompensationCalculation } from '../types';

type HandleBurnParams = CompensationCalculation;

async function handleBurnClimatecoins({
  amount,
  address,
  assets,
  txn: oracleTxN,
  encodedBurnTxn,
  encodedTransferTxn,
  nftIds,
}: HandleBurnParams): Promise<any> {
  console.log('burning...');
  if (!address) return Promise.reject('No address');

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

  return httpClient.post(`/compensations`, { txnId: txId, amount, nfts: nftIds });
}

export function useBurnClimatecoins() {
  const alert = useAlert();
  return useMutation(
    (burnParams: HandleBurnParams) => {
      return handleBurnClimatecoins({
        ...burnParams,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['account']);
        alert.success('Climatecoins compensated succesfully');
      },
      onError: () => {
        alert.error('Error burning climatecoins');
      },
    }
  );
}
