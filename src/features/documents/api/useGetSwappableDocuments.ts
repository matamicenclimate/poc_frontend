import { useQuery } from 'react-query';

import { httpClient } from '@/lib/httpClient';

import { documentKeys } from '../types';

function fetchDocuments<K extends Record<string, string>>(filter: K): Promise<[]> {
  const params = new URLSearchParams(filter).toString();
  return httpClient.get(`/carbon-documents?${params}`);
}

export function useGetSwappableDocuments(userEmail?: string) {
  const parsed = {
    created_by_user: userEmail as string,
    status: 'claimed',
  };
  return useQuery(documentKeys.search(parsed), () => fetchDocuments({ ...parsed }));
}
