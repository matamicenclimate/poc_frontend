import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';
import { Link } from '@/componentes/Elements/Link/Link';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { magiclink } from '@/lib/magiclink';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getBalance } from '../api/getBalance';

export const Wallet = () => {
  const { t } = useTranslation();

  const [address, setAdress] = useState(null);

  useEffect(() => {
    const onMount = async () => {
      // Get user's Algorand public address
      const publicAddress = await magiclink.algorand.getWallet();

      setAdress(publicAddress);
    };
    onMount();
  }, []);

  const account = getBalance(address);

  return (
    <MainLayout title={t('head.Wallet.title')}>
      <Breadcrumb links={[{ to: '/wallet', label: t('head.Wallet.title') }]} />

      <h1>{t('wallet.Wallet.title')}</h1>
      {process.env.NODE_ENV === 'development' ? (
        <Link href="https://bank.testnet.algorand.network/">get faucet </Link>
      ) : null}
    </MainLayout>
  );
};
