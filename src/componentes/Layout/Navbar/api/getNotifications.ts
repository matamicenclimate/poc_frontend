import { useQuery } from 'react-query';
import { httpClient } from '@/lib/httpClient';

export interface Notification {
  is_read: boolean;
  _id: string;
  model_id: string;
  model: string;
  description: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  user: { _id: string };
  id: string;
}
function fetchNotifications(): Promise<Notification[]> {
  const params = new URLSearchParams({
    _sort: 'createdAt:desc',
  });
  return httpClient.get(`/notifications/me?${params}`);
}

export function getNotifications() {
  return useQuery(['notifications'], fetchNotifications, {
    staleTime: 60,
    refetchOnWindowFocus: true,
  });
}
