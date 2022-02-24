import { MainLayout } from '@/componentes/Layout/MainLayout';
import { Link } from '@/componentes/Elements/Link/Link';
import { useTranslation } from 'react-i18next';

export const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <MainLayout title="Dashboard">
      <h1>Dashboard</h1>
      <Link to="/documents/upload">{t('uploadDocuments.link')}</Link>
    </MainLayout>
  );
};
