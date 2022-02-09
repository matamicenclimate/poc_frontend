import { httpClient } from '@/utils/httpClient';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const registerWithEmailAndPassword = (data: RegisterCredentialsDTO): Promise<any> => {
  return httpClient.post('/auth/register', data);
};
