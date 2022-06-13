import { useTranslation } from 'react-i18next';

import { Card } from '@/componentes/Card/Card';
import { Title } from '@/componentes/Elements/Title/Title';
import { Aside } from '@/componentes/Layout/Aside';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';

import { UpdateDataForm } from '../components/UpdateDataForm';

export const Profile = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <MainLayout title={t('head.Profile.pageTitle')}>
      <div className="mt-16 grid gap-8 md:grid-cols-4">
        <Aside />
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
