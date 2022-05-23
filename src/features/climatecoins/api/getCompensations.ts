import { httpClient } from '@/lib/httpClient';
import { useQuery } from 'react-query';
import { Compensation, compensationKeys } from '@/features/climatecoins/types';

function fetchCompensations(): Promise<Compensation[]> {
  const params = new URLSearchParams({
    _sort: 'createdAt:desc',
    _start: '0',
    _limit: '7',
  });
  return httpClient.get(`/compensations/me?${params}`);
}

export function useGetCompensations() {
  return useQuery(compensationKeys.me(), fetchCompensations);
}
