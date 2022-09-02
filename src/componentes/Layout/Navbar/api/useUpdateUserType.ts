import { useAlert } from 'react-alert';
import { useMutation } from 'react-query';

import { AuthUser } from '@/features/auth';
import { useAuth } from '@/lib/auth';
import { httpClient } from '@/lib/httpClient';

function putUserType(type: string): Promise<AuthUser> {
  return httpClient.put(`/users/type`, { type });
}

export function useUpdateUserType() {
  const alert = useAlert();
  const auth = useAuth();

  return useMutation((type: string) => putUserType(type), {
    onSuccess: () => {
      auth.refetchUser();
    },
    onError: () => {
      alert.error('Error updating the user');
    },
  });
}
