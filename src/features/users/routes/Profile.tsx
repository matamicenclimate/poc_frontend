import { useAuth } from '@/lib/auth';
import { useTranslation } from 'react-i18next';
import { Title } from '@/componentes/Elements/Title/Title';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import clsx from 'clsx';
import { Card } from '@/componentes/Card/Card';
import { UpdateAvatarForm } from '../components/UpdateAvatarForm';
import { UpdateDataForm } from '../components/UpdateDataForm';

export const Profile = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const baseAsideLiStyles =
    'flex cursor-pointer items-center px-6 py-2 transition hover:bg-neutral-7';

  const getProfileAvatar = () => {
    if (user?.avatar === null) {
      return 'avatar-placeholder.jpg';
    }
    if (user?.avatar?.url) {
      return user?.avatar.url;
    }
    return 'avatar-placeholder.jpg';
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
          <div className="flex flex-col items-center space-x-2 space-y-7">
            <Card>
              <UpdateAvatarForm />
            </Card>
            <Card>
              <UpdateDataForm />
            </Card>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};
