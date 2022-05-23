import { httpClient } from '@/lib/httpClient';
import { useQuery } from 'react-query';
import { Compensation, compensationKeys } from '@/features/climatecoins/types';

function fetchCompensations(): Promise<Compensation[]> {
  return httpClient.get(`/compensations/me`);
}

export function useGetCompensations() {
  return useQuery(compensationKeys.me(), fetchCompensations);
}
