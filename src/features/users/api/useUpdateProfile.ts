import { useAlert } from 'react-alert';
import { AxiosRequestConfig } from 'axios';
import { httpClient } from '@/lib/httpClient';
import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from '@/lib/auth';
import { toFormData } from '@/utils/toFormData';

function updateProfile(formData: FormData, userId: string): Promise<any> {
  const config: AxiosRequestConfig<FormData> = {
    headers: {
      'content-type': 'application/form-data',
    },
  };
  return httpClient.put(`/users/${userId}`, formData, config);
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const auth = useAuth();
  return useMutation(
    (profileDocument: any) => {
      const formData = toFormData(profileDocument);
      return updateProfile(formData, auth?.user?.id as string);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['auth-user']);
      },
      onError: () => {
        alert.error('Error uploading document');
      },
    }
  );
}
