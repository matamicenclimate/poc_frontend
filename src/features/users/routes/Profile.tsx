import { useAuth } from '@/lib/auth';
import storage from '@/utils/storage';
import { useTranslation } from 'react-i18next';
import { Title } from '@/componentes/Elements/Title/Title';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useWalletContext } from '@/providers/Wallet.context';

export const Profile = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { account } = useWalletContext();

  return (
    <MainLayout title={t('head.Profile.pageTitle')}>
      <Title size={1}>{t('head.Profile.pageTitle')}</Title>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <h2>Wallet</h2>
      <div>Algo Wallet Addr: {account?.address}</div>
      <h2>Token</h2>

      <p className="break-all">{storage.getToken()}</p>
    </MainLayout>
  );
};
