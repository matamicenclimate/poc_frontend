import { API_URL } from '@/config';

export const initMocks = () => {
  if (process.env.REACT_APP_API_MOCKING === 'true') {
    if (process.env.NODE_ENV === 'test') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { server } = require('./server');
      server.listen();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      // const { worker } = require('./browser');
      // worker.start();
    }
  }
};

export const getBaseUrl = (path: string) => `${API_URL}${path}`;
