import { useQuery } from 'react-query';

import { SortState } from '@/hooks/useSort';
import { httpClient } from '@/lib/httpClient';
import { getFromFilter } from '@/utils/queryParams';

import { Compensation, compensationKeys } from '../types';

function fetchCompensations(filter: Record<string, unknown>): Promise<Compensation[]> {
  const params = getFromFilter(filter);
  return httpClient.get(`/compensations/me?${params}`);
}

export function useGetCompensations(sort: SortState) {
  const filter = {
    _sort: !!sort.field && !!sort.order ? `${sort.field}:${sort.order}` : 'createdAt:desc',
    _start: '0',
    _limit: '7',
  };

  return useQuery(compensationKeys.me(filter), () => fetchCompensations(filter));
}
