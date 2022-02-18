import { CarbonDocument, documentKeys } from './index';
import { httpClient } from '@/lib/httpClient';
import { useQuery } from 'react-query';

export function getDocument(id: string) {
  return useQuery(documentKeys.detail(id), () =>
    httpClient.get<CarbonDocument>(`/carbon-documents/${id}`)
  );
}
