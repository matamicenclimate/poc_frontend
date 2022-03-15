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
      <div className="flex flex-col justify-items-start">
        <Link className="mb-2 mt-2 bg-secondary" to="/wallet">
          Wallet / 0 CLIMATE
        </Link>
        <Link className="mb-2 mt-2 bg-secondary" to="/documents/upload">
          {t('uploadDocuments.link')}
        </Link>
        <Link className="mb-2 mt-2 bg-secondary" to="/documents/list">
          documents
        </Link>
        <Link className="mb-2 mt-2 bg-secondary" to="/profile">
          profile
        </Link>
      </div>
    </MainLayout>
  );
};
