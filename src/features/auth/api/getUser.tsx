import { httpClient } from '@/utils/httpClient';
import { AuthUser } from '../types';

export const getUser = (): Promise<AuthUser> => {
  return Promise.resolve({
    id: 'string',
    email: 'string',
    firstName: 'string',
    lastName: 'string',
    bio: 'string',
    role: 'ADMIN',
  });
  //   return httpClient.get('/auth');
};
