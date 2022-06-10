import { useQuery } from 'react-query';

import { httpClient } from '@/lib/httpClient';

import { Compensation, compensationKeys } from '../types';

function fetchCompensation(compensationId: string): Promise<Compensation> {
  return httpClient.get(`/compensations/${compensationId}`);
}

export function useGetCompensation(compensationId?: string) {
  return useQuery(
    compensationKeys.detail(compensationId ?? ''),
    () => fetchCompensation(compensationId as string),
    {
      enabled: !!compensationId,
    }
  );
}
