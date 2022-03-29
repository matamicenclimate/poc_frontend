import { httpClient } from '@/lib/httpClient';
import { useMutation, useQueryClient } from 'react-query';
import { useAlert } from 'react-alert';
import { useAuth } from '@/lib/auth';
import { StrapiUser } from '@/features/auth/types';

function putUserType(userId: string, type: string): Promise<StrapiUser> {
  return httpClient.put(`/users/${userId}`, { type });
}

export function updateUserType() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const auth = useAuth();

  return useMutation(
    ({ userId, type }: { userId: string; type: string }) => putUserType(userId, type),
    {
      onSuccess: () => {
        auth.refetchUser();
      },
      onError: () => {
        alert.error('Error uploading document');
      },
    }
  );
}