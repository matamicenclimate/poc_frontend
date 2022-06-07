import { AuthProviderConfig, initReactQueryAuth } from 'react-query-auth';

import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import {
  AuthUser,
  getUser,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  registerWithEmailAndPassword,
  UserResponse,
} from '@/features/auth';
import { httpClient } from '@/lib/httpClient';
import storage from '@/utils/storage';

import { magiclink } from './magiclink';

async function handleUserResponse(data: UserResponse) {
  const { jwt, user } = data;
  storage.setToken(jwt);
  return user;
}

async function loadUser(): Promise<AuthUser | null> {
  console.log('loading user ...', storage.getToken());
  if (process.env.NODE_ENV === 'test') return { first_name: 'Fernando' } as AuthUser;
  if (!storage.getToken()) return null;
  const isLoggedIn = await magiclink.user.isLoggedIn();

  if (isLoggedIn) {
    /* Get the DID for the user */
    const jwt = await magiclink.user.getIdToken();
    storage.setToken(jwt);

    /* Get user metadata including email */
    const userMetadata = await getUser();
    return userMetadata;
  }

  return null;
}

async function loginFn(data: LoginCredentialsDTO): Promise<AuthUser> {
  const redirectURI = `${window.location.origin}/auth/callback`; // 👈 This will be our callback URI

  const jwt = await magiclink.auth.loginWithMagicLink({ ...data, redirectURI });

  storage.setToken(jwt as string);

  const userMetadata = await getUser();

  const issuer = userMetadata.magic_user.issuer;
  const publicAddress = userMetadata.magic_user.publicAddress;

  const updateData = { issuer: issuer, publicAddress: publicAddress };
  httpClient.put(`/users/${userMetadata.id}`, updateData);

  return userMetadata;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);

  // TODO: fix this
  return user as unknown as AuthUser;
}

async function logoutFn() {
  await magiclink.user.logout();
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig: AuthProviderConfig<AuthUser | null, unknown> = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  },
  waitInitial: process.env.NODE_ENV !== 'test',
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
