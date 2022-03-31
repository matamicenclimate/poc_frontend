import { httpClient } from '@/lib/httpClient';
import { useQuery } from 'react-query';

function fetchCurenciesExchangeRate(): Promise<any> {
  // return Promise.resolve({
  //   USD_USD: 1,
  //   USD_EUR: 1.2,
  //   USD_JPY: 121.99,
  //   USD_GBP: 0.76,
  //   USD_BTC: 0.0000000001,
  // });
  return httpClient.get(`/currency`);
}

export function getCurrenciesExchangeRate() {
  return useQuery(['currencies'], fetchCurenciesExchangeRate, {
    staleTime: 60 * 60,
    refetchOnWindowFocus: false,
  });
}
