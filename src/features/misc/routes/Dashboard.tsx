import { MainLayout } from '@/componentes/Layout/MainLayout';
import { Link } from '@/componentes/Elements/Link/Link';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';

export const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <MainLayout title={t('misc.Dashboard.title')}>
      <Breadcrumb />
      <h1>Dashboard</h1>
      <Link to="/documents/upload">{t('uploadDocuments.link')}</Link>
    </MainLayout>
  );
};
