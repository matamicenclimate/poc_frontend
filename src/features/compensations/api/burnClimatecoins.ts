import algosdk from 'algosdk';
import { Buffer } from 'buffer';
import { useAlert } from 'react-alert';
import { useMutation } from 'react-query';

import { useAuth } from '@/lib/auth';
import { httpClient } from '@/lib/httpClient';
import { magiclink } from '@/lib/magiclink';
import { queryClient } from '@/lib/react-query';

import { Compensation, CompensationCalculation, compensationKeys } from '../types';

type HandleBurnParams = { userId: string | null | undefined } & CompensationCalculation;

async function handleBurnClimatecoins({
  amount,
  txn: oracleTxN,
  encodedBurnTxn,
  encodedTransferTxn,
  nftIds,
}: HandleBurnParams): Promise<Compensation> {
  console.log('burning...');

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

  const signedTxn = [signedTransferTxn, oracleTxnBuffer, signedBurnTxn];

  return httpClient.post(`/compensations`, {
    signedTxn,
    amount,
    nfts: nftIds,
  });
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
        alert.error('Error burning compensations');
      },
    }
  );
}
