import Axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import storage from '@/utils/storage';

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
  baseURL: process.env.REACT_APP_API_URL,
});

httpClient.interceptors.request.use(authRequestInterceptor);
httpClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // TODO: revalidate cookie if we have an auth error once
    const message = error.response?.data?.message || error.message;
    // useNotificationStore.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // });

    return Promise.reject(new Error(message as string));
  }
);
