import { AxiosRequestConfig } from 'axios';
import { useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';

import { AuthUser } from '@/features/auth';
import { httpClient } from '@/lib/httpClient';
import { toFormData } from '@/utils/toFormData';

interface UpdateProfileDTO {
  email: string;
  alias: string;
  name: string;
  surname: string;
  avatar: File;
  city: string;
  country: FormCountry;
  bio: string;
  personal_URL: string;
}

interface FormCountry {
  label: string;
  value: string;
}

function updateProfile(formData: FormData): Promise<AuthUser> {
  const config: AxiosRequestConfig<FormData> = {
    headers: {
      'content-type': 'application/form-data',
    },
  };
  return httpClient.put(`/users/profile`, formData, config);
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  return useMutation(
    (profileDocument: Partial<UpdateProfileDTO>) => {
      const formData = toFormData(profileDocument);
      return updateProfile(formData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['auth-user']);
      },
      onError: () => {
        alert.error('Error updating profile');
      },
    }
  );
}
