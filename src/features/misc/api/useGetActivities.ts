import { Nft } from '@/features/documents/api';
import { httpClient } from '@/lib/httpClient';
import { useQuery } from 'react-query';

export interface Activity {
  group_id?: string;
  is_group: boolean;
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

function fetchActivities(type: string | null, page: number | null): Promise<Activity[]> {
  const params = new URLSearchParams({
    ...(type ? { type } : {}),
    _sort: 'date:desc',
    _start: page ? page.toString() : '0',
    _limit: page ? '10' : '6',
  });
  return httpClient.get(`/activities/me?${params}`);
}

export function useGetActivities(type: string | null, page = null) {
  return useQuery(['activities', 'list', type, page], () => fetchActivities(type, page));
}
