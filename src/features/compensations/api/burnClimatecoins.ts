import algosdk from 'algosdk';
import { Buffer } from 'buffer';
import { useAlert } from 'react-alert';
import { useMutation } from 'react-query';

import { httpClient } from '@/lib/httpClient';
import { magiclink } from '@/lib/magiclink';
import { queryClient } from '@/lib/react-query';

import { Compensation, CompensationCalculation, compensationKeys } from '../types';

async function handleBurnClimatecoins({
  amount,
  signedParamsTxn,
  encodedBurnTxn,
  encodedTransferTxn,
  nftIds,
}: CompensationCalculation): Promise<Compensation> {
  // skip this in testing
  if (process.env.NODE_ENV === 'test') {
    return httpClient.post(`/compensations`, {
      signedTxn: [],
      amount,
      nfts: nftIds,
    });
  }

  // convert the txns to buffers
  const oracleTxnBuffer = Buffer.from(Object.values(signedParamsTxn));
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
  return useMutation((burnParams: CompensationCalculation) => handleBurnClimatecoins(burnParams), {
    onSuccess: () => {
      queryClient.invalidateQueries(['account']);
      queryClient.invalidateQueries(compensationKeys.lists());
      alert.success('Climatecoins compensated succesfully');
    },
    onError: () => {
      alert.error('Error burning compensations');
    },
  });
}
