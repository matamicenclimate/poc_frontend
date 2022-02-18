import { CarbonDocument, documentKeys } from './index';
import { httpClient } from '@/lib/httpClient';
import { useQuery } from 'react-query';

export function getDocuments(userEmail: string) {
  return useQuery(documentKeys.lists(), () =>
    httpClient.get<CarbonDocument[]>(`/carbon-documents?created_by_user=${userEmail}`)
  );
}
