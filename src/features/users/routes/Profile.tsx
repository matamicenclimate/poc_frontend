import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';
import { magiclink } from '@/lib/magiclink';
import storage from '@/utils/storage';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Profile = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [toke, setToken] = useState<string>('');
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
      <h1>{t('head.Profile.pageTitle')}</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <h2>Wallet</h2>
      <div>Algo Wallet Addr: {wallet}</div>
      <h2>Token</h2>

      <p className="break-all">{storage.getToken()}</p>
      <p className="break-all">{toke}</p>
    </MainLayout>
  );
};
