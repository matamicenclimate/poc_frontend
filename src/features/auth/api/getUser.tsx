import { httpClient } from '@/lib/httpClient';
import { magiclink } from '@/lib/magiclink';
import { AuthUser } from '../types';

export const getUser = async (): Promise<AuthUser> => {
  // const user = (await magiclink.user.getMetadata()) as unknown as AuthUser;

  const getMagicUser = magiclink.user.getMetadata();
  const getStrapiUser = httpClient.get('/users/me');

  const data = await Promise.all([getMagicUser, getStrapiUser]);

  return { ...data[1], magic_user: data[0] } as unknown as AuthUser;
};
