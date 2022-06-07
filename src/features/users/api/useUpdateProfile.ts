import { AxiosRequestConfig } from 'axios';
import { useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';

import { StrapiUser } from '@/features/auth';
import { useAuth } from '@/lib/auth';
import { httpClient } from '@/lib/httpClient';
import { toFormData } from '@/utils/toFormData';

interface UpdateProfileDTO {
  firstname: string;
  surname: string;
  avatar: File | any; // TODO: check this type xD
}

function updateProfile(formData: FormData, userId: string): Promise<StrapiUser> {
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
    (profileDocument: Partial<UpdateProfileDTO>) => {
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
