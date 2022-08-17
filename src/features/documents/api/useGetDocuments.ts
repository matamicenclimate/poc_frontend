import { format } from 'date-fns';
import { useQuery } from 'react-query';

import { SortState } from '@/hooks/useSort';
import { httpClient } from '@/lib/httpClient';
import { getFromFilter } from '@/utils/queryParams';

import { CarbonDocument, documentKeys } from '../types';

export type PaginatedDocumentsResponse = {
  data: CarbonDocument[];
  total: number;
};

function fetchDocuments(filter: Record<string, unknown>): Promise<PaginatedDocumentsResponse> {
  const params = getFromFilter(filter);
  return httpClient.get(`/carbon-documents/by-user/paginated?${params}`);
}

export function useGetDocuments(filter: Record<any, any>, sort: SortState, firstIndex?: number, maxItemsPerPage?: number) {
  const { dates, ...newFilter } = filter;
  const parsed = {
    ...newFilter,
    credit_start_lte: dates?.from ? format(dates.from, 'yyyy-MM-dd') : undefined,
    credit_end_gte: dates?.to ? format(dates.to, 'yyyy-MM-dd') : undefined,
    _sort: !!sort.field && !!sort.order ? `${sort.field}:${sort.order}` : undefined,
    _start: firstIndex ?? '0',
    _limit: maxItemsPerPage ?? '10',
  };

  return useQuery(documentKeys.paginated(parsed), () => fetchDocuments(parsed));
}
