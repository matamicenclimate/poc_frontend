import { httpClient } from '@/services/http.client';

export const loginWithEmail = () => {
  return httpClient.get('/auth');
};
