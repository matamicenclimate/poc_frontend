
import { httpClient } from '@/lib/httpClient';
import { useQuery } from 'react-query';

function fetchChartBalance(): Promise<any> {
  return httpClient.get(`/chart/balance/me`);
}

export function useGetChartData() {
  return useQuery(["chart","balance"], fetchChartBalance);
}
