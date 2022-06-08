import { useTranslation } from 'react-i18next';

import { Card } from '@/componentes/Card/Card';
import { Button } from '@/componentes/Elements/Button/Button';
import { Link } from '@/componentes/Elements/Link/Link';
import { Title } from '@/componentes/Elements/Title/Title';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { EXPLORER_URL } from '@/config';
import { useGetSwappableDocuments } from '@/features/documents';
import { BalanceShowcase } from '@/features/misc';
import { useAuth } from '@/lib/auth';
import { useWalletContext } from '@/providers/Wallet.context';

import { useGetChartData } from '../api/useGetChartData';
import { useOptinToAsset } from '../api/useOptinToAsset';
import { CarbonDocumentNftCard } from '../components/CarbonDocumentNftCard';

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
        <div>
          <Link
            href={`${EXPLORER_URL}address/${encodeURIComponent(account?.address as string)}`}
            className="inline-flex items-center text-sm"
          >
            {account?.address}
            <img src="/icons/algoexplorer.png" className="h-3 w-3 rounded-full" />
          </Link>
        </div>
      </div>
      {!hasOptedIn(Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID as string)) && (
        <Card padding="sm">
          <div className="flex items-center justify-between">
            <div>You have to opt-in to receive Climatecoins in order to continue</div>
            <Button
              onClick={() =>
                optinToAsset.mutate(Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID as string))
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
                optinToAsset.mutate(Number(process.env.REACT_APP_USDC_ASA_ID as string))
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

        <Title size={4} as={2}>
          Unclaimed Nfts
        </Title>
        <CarbonDocumentNftCard data={swappableNfts} />
      </div>
    </MainLayout>
  );
};
