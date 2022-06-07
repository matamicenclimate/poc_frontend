import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/componentes/Elements/Button/Button';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { Input } from '@/componentes/Form/Inputs';
import { useAuth } from '@/lib/auth';

import { useUpdateProfile } from '../api/useUpdateProfile';
import { ProfileValidationSchema } from '../validation/ProfileValidation';

export const UpdateDataForm = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const methods = useForm<ProfileValidationSchema>({
    mode: 'onBlur',
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
    },
  });

  const updateProfile = useUpdateProfile();

  const baseInputProps = {
    register: methods.register,
    control: methods.control,
    errors: methods.formState.errors,
    wrapperClassName: 'col-span-2',
  };

  const handleSubmit = (data: any) => {
    updateProfile.mutate(data);
  };

  return (
    <form className="space-y-5" onSubmit={methods.handleSubmit(handleSubmit)}>
      <Input<ProfileValidationSchema>
        label={t('profile.name')}
        name="first_name"
        type="text"
        placeholder={t('profile.name')}
        {...baseInputProps}
      />

      <Input<ProfileValidationSchema>
        label={t('profile.surname')}
        name="last_name"
        type="text"
        placeholder={t('profile.surname')}
        {...baseInputProps}
      />
      <div className="flex items-center space-x-4">
        <Button type="submit" size="md" disabled={updateProfile.isLoading}>
          {t('profile.button')}
        </Button>
        {updateProfile.isLoading && <Spinner size="md" />}
      </div>
    </form>
  );
};
