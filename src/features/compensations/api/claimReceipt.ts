import algosdk from 'algosdk';
import { Buffer } from 'buffer';
import { useAlert } from 'react-alert';
import { useMutation } from 'react-query';

import { httpClient } from '@/lib/httpClient';
import { magiclink } from '@/lib/magiclink';
import {queryClient} from "@/lib/react-query";

import {Compensation, compensationKeys, ReceiptClaimTxns} from '../types';

async function handleClaimReceipt({
                                        compensationId,
                                        signedTransferTxn,
                                        encodedOptinTxn,
                                      }: ReceiptClaimTxns): Promise<Compensation> {
  // convert the txns to buffers
  const optinTxnBuffer = Buffer.from(Object.values(encodedOptinTxn));
  const signedTransferTxnBuffer = Buffer.from(Object.values(signedTransferTxn));

  // skip this in testing
  if (process.env.NODE_ENV === 'test') {
    return httpClient.post(`/compensations/${compensationId}/claim/receipt`, {
      signedTxn: []
    });
  }

  // decode and sign
  const signedOptinTxn = await magiclink.algorand.signTransaction(
    algosdk.decodeUnsignedTransaction(optinTxnBuffer).toByte()
  );

  const signedTxn = [signedOptinTxn, signedTransferTxnBuffer];
  return httpClient.post(`/compensations/${compensationId}/claim/receipt`, {
    signedTxn
  });
}

export function useClaimReceipt() {
  const alert = useAlert();
  return useMutation((claimTxns: ReceiptClaimTxns) => handleClaimReceipt(claimTxns), {
    onSuccess: () => {
      queryClient.invalidateQueries(['account']);
      queryClient.invalidateQueries(compensationKeys.lists());
      alert.success('Receipt NFT claimed successfully');
    },
    onError: () => {
      alert.error('Error claiming the receipt');
    },
  });
}
