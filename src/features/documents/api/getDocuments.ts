import { CarbonDocument, documentKeys } from './index';
import { httpClient } from '@/lib/httpClient';
import { useQuery } from 'react-query';

function fetchDocuments(userEmail: string): Promise<CarbonDocument[]> {
  return httpClient.get(`/carbon-documents?created_by_user=${userEmail}`);
}
export function getDocuments(userEmail: string) {
  return useQuery(documentKeys.lists(), () => fetchDocuments(userEmail));
}
