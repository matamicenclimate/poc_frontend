import { AuthUser, UserResponse } from './../types/index';
import { httpClient } from '@/utils/httpClient';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return Promise.resolve({
    jwt: 'asds',
    user: {
      id: 'string',
      email: 'string',
      firstName: 'string',
      lastName: 'string',
      bio: 'string',
      role: 'ADMIN',
    },
  });
  return httpClient.post('/auth/login', data);
};
