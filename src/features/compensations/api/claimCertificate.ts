import algosdk from 'algosdk';
import { Buffer } from 'buffer';
import { useAlert } from 'react-alert';
import { useMutation } from 'react-query';

import { httpClient } from '@/lib/httpClient';
import { magiclink } from '@/lib/magiclink';
import {queryClient} from "@/lib/react-query";

import {CertificateClaimTxns, Compensation, compensationKeys} from '../types';

async function handleClaimCertificate({
                                        compensationId,
                                        signedExchangeTxn,
                                        encodedOptinTxn,
                                      }: CertificateClaimTxns): Promise<Compensation> {
  // convert the txns to buffers
  const optinTxnBuffer = Buffer.from(Object.values(encodedOptinTxn));
  const signedTransferTxnBuffer = Buffer.from(Object.values(signedExchangeTxn));

  // skip this in testing
  if (process.env.NODE_ENV === 'test') {
    return httpClient.post(`/compensations/${compensationId}/claim/certificate`, {
      signedTxn: []
    });
  }

  // decode and sign
  const signedOptinTxn = await magiclink.algorand.signTransaction(
    algosdk.decodeUnsignedTransaction(optinTxnBuffer).toByte()
  );

  const signedTxn = [signedOptinTxn, signedTransferTxnBuffer];
  return httpClient.post(`/compensations/${compensationId}/claim/certificate`, {
    signedTxn
  });
}

export function useClaimCertificate() {
  const alert = useAlert();
  return useMutation((claimTxns: CertificateClaimTxns) => handleClaimCertificate(claimTxns), {
    onSuccess: () => {
      queryClient.invalidateQueries(['account']);
      queryClient.invalidateQueries(compensationKeys.lists());
      alert.success('Certificate NFT claimed successfully');
    },
    onError: () => {
      alert.error('Error claiming the certificate');
    },
  });
}
