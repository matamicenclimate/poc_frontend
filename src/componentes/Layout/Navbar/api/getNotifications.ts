import { useQuery } from 'react-query';
import { httpClient } from '@/lib/httpClient';

function fetchNotifications(): Promise<any[]> {
  return httpClient.get(`/notifications`);
}
export function getNotifications() {
  return useQuery(['notifications'], fetchNotifications, {
    staleTime: 60,
    refetchOnWindowFocus: true,
  });
}
