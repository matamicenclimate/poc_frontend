import { useAuth } from '@/lib/auth';
import { useTranslation } from 'react-i18next';
import { Title } from '@/componentes/Elements/Title/Title';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useWalletContext } from '@/providers/Wallet.context';
import { Input } from '@/componentes/Form/Inputs';
import { Card } from '@/componentes/Card/Card';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import FileInput from '@/componentes/Form/FileInput';
import { Button } from '@/componentes/Elements/Button/Button';
import { ProfileValidationSchema } from '../validation/ProfileValidation';
import { AxiosRequestConfig } from 'axios';
import { useUpdateProfile } from '../api/useUpdateProfile';

export const Profile = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { account } = useWalletContext();

  const methods = useForm<any>({
    mode: 'onBlur',
  });

  const baseInputProps = {
    register: methods.register,
    control: methods.control,
    errors: methods.formState.errors,
    wrapperClassName: 'col-span-2',
  };

  const baseAsideLiStyles =
    'flex cursor-pointer items-center px-6 py-2 transition hover:bg-neutral-7';

  const getAvatarPreview = () => {
    if (methods.watch('avatar') === undefined) {
      return 'avatar-placeholder.jpg';
    }
    if (methods.watch('avatar').length === 1) {
      return URL.createObjectURL(methods.watch('avatar')[0]);
    }
    return 'avatar-placeholder.jpg';
  };

  const getProfileAvatar = () => {
    if (user?.avatar === null) {
      return 'avatar-placeholder.jpg';
    }
    if (user?.avatar?.url) {
      return user?.avatar.url;
    }
    return 'avatar-placeholder.jpg';
  };

  const updateProfile = useUpdateProfile();

  const handleSubmit = async (data: any) => {
    await updateProfile.mutateAsync(data);
  };

  return (
    <MainLayout title={t('head.Profile.pageTitle')}>
      <Title size={1}>{t('head.Profile.pageTitle')}</Title>
      <div className="grid gap-8 md:grid-cols-4">
        <aside className="text-sm font-bold text-neutral-4">
          <img src={getProfileAvatar()} className="mx-auto h-36 rounded-full" />
          <div className="my-4 text-center">
            <>
              {t('documents.Upload.hi')}
              {user?.first_name} 👋🏻
            </>
          </div>
          <hr />
          <ul className="my-2 space-y-1">
            <li className={clsx(baseAsideLiStyles)}>
              {t('profile.name')}: {user?.first_name}
            </li>
            <li className={clsx(baseAsideLiStyles)}>
              {t('profile.surname')}: {user?.last_name}
            </li>
          </ul>
        </aside>

        <main className="space-y-4 md:col-span-3">
          <div className="flex items-center space-x-2">
            <Card>
              <Title className="mb-4" size={5} as={2}>
                {t('profile.edit')}
              </Title>

              <form className="space-y-5" onSubmit={methods.handleSubmit(handleSubmit)}>
                <div className="grid gap-4 md:grid-cols-3">
                  <FileInput<ProfileValidationSchema>
                    {...baseInputProps}
                    label={t('profile.avatar')}
                    required
                    name="avatar"
                    accept={'.png, .jpg, .jpeg'}
                  />
                  <img
                    src={getAvatarPreview()}
                    className="mx-auto h-36 rounded-full md:col-span-1"
                  />
                </div>
                <Input<ProfileValidationSchema>
                  label={t('profile.name')}
                  name="first_name"
                  type="text"
                  placeholder={user?.first_name ? user.first_name : t('profile.name')}
                  {...baseInputProps}
                />

                <Input<ProfileValidationSchema>
                  label={t('profile.surname')}
                  name="last_name"
                  type="text"
                  placeholder={user?.last_name ? user.last_name : t('profile.surname')}
                  {...baseInputProps}
                />
                <Button type="submit" size="md" disabled={updateProfile.isLoading}>
                  Actualizar
                </Button>
              </form>
            </Card>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};
