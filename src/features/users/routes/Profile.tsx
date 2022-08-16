import { useTranslation } from 'react-i18next';

import { Card } from '@/componentes/Card/Card';
import { Title } from '@/componentes/Elements/Title/Title';
import { Aside } from '@/componentes/Layout/Aside/Aside';
import { OperationsMenu } from '@/componentes/Layout/Aside/components/OperationsMenu';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';

import { PersonalMenu } from '../../../componentes/Layout/Aside/components/PersonalMenu';
import { UpdateDataForm } from '../components/UpdateDataForm';

export const Profile = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const getProfileAvatar = () => {
    if (user?.avatar?.url) {
      return user?.avatar.url;
    }
    return 'avatar-placeholder.jpg';
  };

  return (
    <MainLayout title={t('head.Profile.pageTitle')}>
      <div className="mt-16 grid gap-8 md:grid-cols-4">
        <aside className="text-sm text-neutral-4">
          <img src={getProfileAvatar()} className="h-32 rounded-full" />
          <div className="mb-4 mt-8 flex flex-col capitalize ">
            <div className="text-2xl  text-black">
              {t('documents.Upload.hi')}
              {user?.name ? user?.name : user?.email && user?.email?.split('@')[0]} 👋🏻
            </div>
            <div className="mt-2 text-lg text-neutral-5">
              {user?.type}
              {user?.country?.name && `, ${user.country.name}`}
            </div>
          </div>
          <hr />
          <Aside menu={OperationsMenu()} />
          <hr />
          <Aside menu={PersonalMenu()} />
        </aside>
        <main className="space-y-4 md:col-span-3">
          <div className="flex flex-col items-center space-x-2 space-y-7">
            <Card>
              <Title size={5} as={2} className="mb-12">
                {t('Profile.title')}
              </Title>
              {user && <UpdateDataForm initialData={user} />}
            </Card>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};
