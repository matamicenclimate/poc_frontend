import { useAlert } from 'react-alert';
import { useMutation } from 'react-query';

import { httpClient } from '@/lib/httpClient';

import {ReceiptClaimTxns} from '../types';

async function fetchReceiptClaimTxns(compensationId: string): Promise<ReceiptClaimTxns> {
  return httpClient.get(`/compensations/${compensationId}/claim/receipt`);
}

export function usePrepareClaimReceipt() {
  const alert = useAlert();
  return useMutation(
    (compensationId: string) => {
      return fetchReceiptClaimTxns(compensationId);
    },
    {
      onError: () => {
        alert.error('Error claiming the receipt');
      },
    }
  );
}
