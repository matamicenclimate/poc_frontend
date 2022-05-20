import { useAlert } from 'react-alert';
import { httpClient } from '@/lib/httpClient';
import { useMutation } from 'react-query';
import { CompensationCalculation } from '../types';

function fetchCalculateCompensation(amount: number): Promise<CompensationCalculation> {
  const params = new URLSearchParams({
    amount: amount.toString(),
  });
  return httpClient.get(`/compensations/calculate?${params.toString()}`);
}

export function useCalculateCompensation() {
  const alert = useAlert();
  return useMutation(
    (amount: number) => {
      return fetchCalculateCompensation(amount);
    },
    {
      onError: () => {
        alert.error('Error calculating compensation');
      },
    }
  );
}
