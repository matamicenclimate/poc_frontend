import { httpClient } from '@/lib/httpClient';
import { useQuery } from 'react-query';

export interface ChartBalance {
  labels: string[];
  data: number[];
}

function fetchChartBalance(): Promise<ChartBalance> {
  return httpClient.get(`/chart/balance/me?type=weekly`);
}

export function useGetChartData() {
  return useQuery(['chart', 'balance'], fetchChartBalance);
}
