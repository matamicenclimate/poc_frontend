import { httpClient } from '@/lib/httpClient';
import { magiclink } from '@/lib/magiclink';
import { AuthUser } from '../types';

export const getUser = async (): Promise<AuthUser> => {
  // const user = (await magiclink.user.getMetadata()) as unknown as AuthUser;

  const getMagicUser = await magiclink.user.getMetadata();
  const getStrapiUser = await httpClient.get('/users/me');

  // const data = await Promise.all([getMagicUser, getStrapiUser]);

  return { ...getStrapiUser, magic_user: getMagicUser } as unknown as AuthUser;
};
