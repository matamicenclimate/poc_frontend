import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/componentes/Elements/Button/Button';
import FileInput from '@/componentes/Form/FileInput';

import { useUpdateProfile } from '../api/useUpdateProfile';
import { ProfileValidationSchema } from '../validation/ProfileValidation';

export const UpdateAvatarForm = () => {
  const { t } = useTranslation();

  const methods = useForm<any>({
    mode: 'onBlur',
  });

  const updateProfile = useUpdateProfile();

  const baseInputProps = {
    register: methods.register,
    control: methods.control,
    errors: methods.formState.errors,
    wrapperClassName: 'col-span-2',
  };

  const getAvatarPreview = () => {
    if (methods.watch('avatar').length === 1) {
      return URL.createObjectURL(methods.watch('avatar')[0]);
    }
    return 'avatar-placeholder.jpg';
  };

  const handleSubmit = (data: any) => {
    updateProfile.mutate(data);
  };

  return (
    <form className="space-y-5" onSubmit={methods.handleSubmit(handleSubmit)}>
      <div className="grid gap-4 md:grid-cols-3">
        <FileInput<ProfileValidationSchema>
          {...baseInputProps}
          label={t('profile.avatar')}
          required
          name="avatar"
          accept=".png,.jpg,.jpeg"
          control={methods.control}
        />
        <img src={getAvatarPreview()} className="mx-auto h-36 rounded-full md:col-span-1" />
      </div>

      <Button type="submit" size="md" disabled={updateProfile.isLoading}>
        {t('profile.button')}
      </Button>
    </form>
  );
};
