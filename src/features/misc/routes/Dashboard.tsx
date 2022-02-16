import { Button } from '@/componentes/Elements/Button/Button';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <h1>Dashboard</h1>
      <Button>
        <Link to="/upload/documents">{t('uploadDocuments.link')}</Link>
      </Button>
    </MainLayout>
  );
};
