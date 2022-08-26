import { useAlert } from 'react-alert';
import { useMutation } from 'react-query';

import { UserResponse } from '@/features/auth';
import { useAuth } from '@/lib/auth';
import { httpClient } from '@/lib/httpClient';
import storage from '@/utils/storage';

function verifyEmail(token: string): Promise<UserResponse> {
  return httpClient.get(`/users/verify?token=${token}`);
}

export function useVerifyEmail() {
  const alert = useAlert();
  const auth = useAuth();
  return useMutation((token: string) => verifyEmail(token), {
    onSuccess: (user: UserResponse) => {
      storage.setToken(user.jwt);
      auth.refetchUser();
      alert.success('Email verified');
    },
    onError: () => {
      alert.error('Error verifying email');
    },
    onSettled: () => {
      setTimeout(() => {
        window.location.assign(window.location.origin as unknown as string);
      }, 2000);
    },
  });
}
