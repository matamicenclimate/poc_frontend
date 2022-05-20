import Axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import storage from '@/utils/storage';
import { magiclink } from './magiclink';
import { API_URL } from '@/config';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  const headers = config.headers as AxiosRequestHeaders;
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  headers.Accept = 'application/json';
  return config;
}

export const httpClient = Axios.create({
  baseURL: API_URL,
});

httpClient.interceptors.request.use(authRequestInterceptor);
httpClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    // TODO: revalidate cookie if we have an auth error once
    const message = error.response?.data?.message || error.message;

    const originalRequest = error.config;

    // TODO: esto es lo que rompe los test
    // https://lewiskori.com/blog/how-to-auto-refresh-jwts-using-axios-interceptors/
    if (message === 'Invalid token.' && !originalRequest._retry) {
      originalRequest._retry = true;
      /* Get the DID for the user */
      const jwt = await magiclink.user.getIdToken();
      storage.setToken(jwt);

      return httpClient.request(originalRequest);
    }

    return Promise.reject(new Error(message as string));
  }
);
