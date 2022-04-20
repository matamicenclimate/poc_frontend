import { Nft } from '@/features/documents/api';
import { httpClient } from '@/lib/httpClient';
import { useQuery } from 'react-query';

export interface Activity {
  txn_id?: string;
  type: string;
  _id: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  created_by: object;
  nft: Nft;
  updated_by: object;
  user: object;
  id: string;
  supply: string;
}

function fetchActivities(type: string | null): Promise<Activity[]> {
  const params = new URLSearchParams({ ...(type ? { type } : {}), _sort: 'date:asc' });
  return httpClient.get(`/activities/me?${params}`);
}

export function useGetActivities(type: string | null) {
  return useQuery(['activities', 'list', type], () => fetchActivities(type));
}
