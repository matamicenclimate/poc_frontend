import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useTranslation } from 'react-i18next';

export const Landing = () => {
  const { t } = useTranslation();

  return <MainLayout title={t('misc.Landing.title')}>Landing</MainLayout>;
};
