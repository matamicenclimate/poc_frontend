import { useQuery } from 'react-query';

import { httpClient } from '@/lib/httpClient';

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
