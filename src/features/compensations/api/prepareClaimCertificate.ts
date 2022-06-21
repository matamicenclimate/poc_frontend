import { useAlert } from 'react-alert';
import { useMutation } from 'react-query';

import { httpClient } from '@/lib/httpClient';

import {CertificateClaimTxns} from '../types';

async function fetchCertClaimTxns(compensationId: string): Promise<CertificateClaimTxns> {
  return httpClient.get(`/compensations/${compensationId}/claim/certificate`);
}

export function usePrepareClaimCertificate() {
  const alert = useAlert();
  return useMutation(
    (compensationId: string) => {
      return fetchCertClaimTxns(compensationId);
    },
    {
      onError: () => {
        alert.error('Error claiming the certificate');
      },
    }
  );
}
