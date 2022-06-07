import { useQuery } from 'react-query';

import { httpClient } from '@/lib/httpClient';

import { CarbonDocument, documentKeys } from '../types';

function fetchDocuments(id: string): Promise<CarbonDocument> {
  return httpClient.get(`/carbon-documents/${id}`);
}

export function useGetDocument(id: string) {
  return useQuery(documentKeys.detail(id), () => fetchDocuments(id));
}
