import { CarbonDocument, documentKeys } from '../types';
import { httpClient } from '@/lib/httpClient';
import { useQuery } from 'react-query';

function fetchDocuments(id: string): Promise<CarbonDocument> {
  return httpClient.get(`/carbon-documents/${id}`);
}

export function useGetDocument(id: string) {
  return useQuery(documentKeys.detail(id), () => fetchDocuments(id));
}
