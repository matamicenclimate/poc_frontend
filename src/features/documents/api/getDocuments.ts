import { CarbonDocument, documentKeys } from './index';
import { httpClient } from '@/lib/httpClient';
import { useQuery } from 'react-query';
import { format } from 'date-fns';

function fetchDocuments(filter: Record<any, any>): Promise<CarbonDocument[]> {
  const newFilter: any = {};
  Object.keys(filter).forEach(function (key) {
    if (typeof filter[key] === 'undefined' || filter[key] === null || filter[key] === '') {
      return;
    } else {
      newFilter[key] = filter[key];
    }
  });
  console.log(newFilter);

  const params = new URLSearchParams({
    ...newFilter,
  }).toString();
  return httpClient.get(`/carbon-documents?${params}`);
}

export function getDocuments(userEmail: string, filter: Record<any, any>) {
  const { dates, ...newFilter } = filter;
  const parsed = {
    ...newFilter,
    credit_start_lte: dates?.from ? format(dates.from, 'yyyy-MM-dd') : undefined,
    credit_end_gte: dates?.to ? format(dates.to, 'yyyy-MM-dd') : undefined,
    created_by_user: userEmail,
  };
  return useQuery(documentKeys.search(parsed), () => fetchDocuments(parsed));
}
