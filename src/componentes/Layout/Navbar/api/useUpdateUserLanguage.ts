import { useAlert } from 'react-alert';
import { useMutation } from 'react-query';

import { AuthUser } from '@/features/auth';
import { useAuth } from '@/lib/auth';
import { httpClient } from '@/lib/httpClient';

function putUserLanguage(language: string): Promise<AuthUser> {
  return httpClient.put(`/users/language`, { language });
}

export function useUpdateUserLanguage() {
  const alert = useAlert();
  const auth = useAuth();

  return useMutation((language: string) => putUserLanguage(language), {
    onSuccess: () => {
      auth.refetchUser();
    },
    onError: () => {
      alert.error('Error updating the user');
    },
  });
}
