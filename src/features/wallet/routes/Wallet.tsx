import { Button } from '@/componentes/Elements/Button/Button';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useTranslation } from 'react-i18next';
import { Title } from '@/componentes/Elements/Title/Title';
import { useWalletContext } from '@/providers/Wallet.context';
import { Card } from '@/componentes/Card/Card';
import { useOptinToAsset } from '../api/useOptinToAsset';
import { useGetSwappableDocuments } from '@/features/documents';
import { useAuth } from '@/lib/auth';
import { NftCard } from '@/features/wallet/components/NftCard';
import { useGetChartData } from '@/features/misc/api/useGetChartData';
import { BalanceShowcase } from '@/features/misc/components/BalanceShowcase';

export const Wallet = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { account, hasOptedIn } = useWalletContext();
  const optinToAsset = useOptinToAsset();
  const swappableNfts = useGetSwappableDocuments(user?.email);
  const { climatecoinBalance } = useWalletContext();
  const chartBalance = useGetChartData();
  return (
    <MainLayout title={t('head.Wallet.title')}>
      <div className="flex items-center justify-between py-8">
        <Title size={3} as={1}>
          {t('wallet.Wallet.title')}
        </Title>
        <div>{account?.address}</div>
      </div>
      {!hasOptedIn(Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID as string)) && (
        <Card padding="sm">
          <div className="flex items-center justify-between">
            <div>You have to opt-in to receive Climatecoins in order to continue</div>
            <Button
              onClick={() =>
                optinToAsset.mutateAsync(Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID as string))
              }
              size="xs"
            >
              opt in to climatecoin
            </Button>
          </div>
        </Card>
      )}
      {!hasOptedIn(Number(process.env.REACT_APP_USDC_ASA_ID as string)) && (
        <Card padding="sm">
          <div className="flex items-center justify-between">
            <div>You have to opt-in to receive usdc in order to continue</div>
            <Button
              onClick={() =>
                optinToAsset.mutateAsync(Number(process.env.REACT_APP_USDC_ASA_ID as string))
              }
              size="xs"
            >
              opt in to usdc
            </Button>
          </div>
        </Card>
      )}
      <div className="flex flex-col space-y-8">
        <BalanceShowcase climatecoinBalance={climatecoinBalance} chartBalance={chartBalance} />
        <NftCard data={swappableNfts} />
      </div>
    </MainLayout>
  );
};
