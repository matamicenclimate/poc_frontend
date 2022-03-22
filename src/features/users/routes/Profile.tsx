import { useAuth } from '@/lib/auth';
import storage from '@/utils/storage';
import { magiclink } from '@/lib/magiclink';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title } from '@/componentes/Elements/Title/Title';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';

export const Profile = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [token, setToken] = useState<string>('');
  const [wallet, setWallet] = useState<string>('');
  useEffect(() => {
    const onMount = async () => {
      const jwt = await magiclink.user.getIdToken();
      setToken(jwt);
      const publicAddress = await magiclink.algorand.getWallet();
      setWallet(publicAddress);
      console.log('algorand public address', publicAddress);
    };
    onMount();
  }, []);
  return (
    <MainLayout title={t('head.Profile.pageTitle')}>
      <Breadcrumb links={[{ to: '/profile', label: t('head.Profile.pageTitle') }]} />
      <Title size={1}>{t('head.Profile.pageTitle')}</Title>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <h2>Wallet</h2>
      <div>Algo Wallet Addr: {wallet}</div>
      <h2>Token</h2>

      <p className="break-all">{storage.getToken()}</p>
      <p className="break-all">{token}</p>
    </MainLayout>
  );
};
