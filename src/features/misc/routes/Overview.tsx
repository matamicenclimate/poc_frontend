import { MainLayout } from '@/componentes/Layout/MainLayout';
import { Link } from '@/componentes/Elements/Link/Link';
import { useTranslation } from 'react-i18next';
import { Head } from '@/componentes/Layout/Head';
import { Title } from '@/componentes/Elements/Title/Title';
import { Pill, PillProps } from '@/componentes/Elements/Pill/Pill';
import OverviewImage from '../../../assets/images/overview.jpg';
import { Button } from '@/componentes/Elements/Button/Button';
import { useState } from 'react';
import { useWalletContext } from '@/providers/Wallet.context';
import { useCurrencyContext } from '@/providers/Currency.context';
import { Icon } from '@/componentes/Icon/Icon';
import { BalanceChart } from '@/features/misc/components/BalanceChart';
import { useGetChartData } from '@/features/misc/api/useGetChartData';
import { useGetActivities } from '../api/getActivity';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { format } from 'date-fns';

export const Overview = () => {
  const { t } = useTranslation();
  const [tabSelected, setTabSelected] = useState<string | null>(null);

  const activities = useGetActivities(tabSelected);

  const tabs = [
    {
      label: t('components.Overview.all'),
      value: null,
    },
    {
      label: t('components.Overview.swap'),
      value: 'swap',
    },
    {
      label: t('components.Overview.buy'),
      value: 'buy',
    },
    {
      label: t('components.Overview.sell'),
      value: 'sell',
    },
    {
      label: t('components.Overview.transfer'),
      value: 'transfer',
    },
  ];

  const pillVariants: Record<string, PillProps['variant']> = {
    swap: 'swap',
    buy: 'featured',
    sell: 'popular',
    offset: 'comingSoon',
  };

  const { climatecoinBalance } = useWalletContext();
  const { formatter } = useCurrencyContext();
  const chartBalance = useGetChartData();

  const renderActivity = () => {
    if (activities?.data) {
      return (
        <tbody>
          {activities.data.map((data) => {
            return (
              <tr key={data.id}>
                <td className="inline-block">
                  <Pill
                    style="solid"
                    className="text-xs"
                    variant={data.type ? pillVariants[data.type] : 'new'}
                  >
                    {data.type}
                  </Pill>
                </td>
                <td className="text-sm">{data.supply}</td>
                <td key="operation" className="text-sm">
                  {data.nft.asa_txn_id}
                </td>
                <td className="text-right text-sm">
                  {format(new Date(data.createdAt), 'dd/MM/yyyy')}
                </td>
              </tr>
            );
          })}
        </tbody>
      );
    }
    if (activities.error instanceof Error) {
      return (
        <tr>
          <td colSpan={4}>{('An error has occurred: ' + activities.error.message) as string}</td>
        </tr>
      );
    }
    return (
      <tr>
        <Spinner />
      </tr>
    );
  };

  return (
    <MainLayout title={t('misc.Overview.title')}>
      <Head title={t('misc.Overview.title')} />

      <div id="top-row" className="flex flex-col p-8">
        <Title size={4} as={1}>
          {t('misc.Overview.title')}
        </Title>
        <div className="mt-5 grid gap-16 md:grid-cols-3">
          <div id="price-panel" className="flex flex-col gap-3">
            <p className="text-sm font-medium text-neutral-3">
              {t<string>('components.Overview.totalBalance')}
            </p>
            <div className="leading-tight">
              <div className="flex items-center">
                <p className="mr-2 text-6xl text-neutral-2">
                  {t<string>('intlNumber', { val: climatecoinBalance().toFixed(2) })}
                </p>
                <div className="h-[1.625rem] w-[6.6875rem] text-center">
                  <Pill style="solid" variant="popular">
                    Climatecoins
                  </Pill>
                </div>
              </div>
              <p className="text-2xl text-neutral-4">
                {formatter(climatecoinBalance() * (40 * 100))}
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <Link size="sm" as="button" variant="primary" to="/">
                {t('components.Overview.footprint')}
              </Link>
              <Link size="sm" variant="light" to="/" as="button">
                {t('components.Overview.buyClimatecoins')}
              </Link>
            </div>
          </div>
          <div id="graphic-panel" className="col-span-2 flex flex-col text-sm">
            <div className="flex-grow" />
            <div>
              <BalanceChart width={500} />
            </div>
            <p className="py-4 pt-8 text-right">
              🌱 You have enough climatecoins to clean <Link to="#">a football stadium</Link>
            </p>
          </div>
        </div>
      </div>

      <div id="bottom-row" className="grid gap-7 p-8 md:grid-cols-3">
        <div
          id="view-more-panel"
          className="flex h-[27.25rem] flex-col justify-end rounded-xl bg-cover bg-center px-8 pb-6 text-neutral-9 "
          style={{ backgroundImage: `url(${OverviewImage})` }}
        >
          <Title size={4} as={3}>
            {t('components.Overview.viewMore.title')}
          </Title>
          <p className="text-sm text-neutral-6">
            {t<string>('components.Overview.viewMore.subtitle')}
          </p>
          <div className="mt-8 h-[3rem] w-[9.0625rem]">
            <Link
              size="sm"
              iconRight={<Icon id="arrow-right" className="ml-1 h-4 w-4" />}
              variant="light"
              to="/"
              as="button"
            >
              {t('components.Overview.viewMore.link')}
            </Link>
          </div>
        </div>
        <div id="activity-panel" className="flex flex-col space-y-7 md:col-span-2">
          <div id="activity-panel-tabs" className="flex gap-4 ">
            {tabs.map((tab) => {
              return (
                <Button
                  onClick={() => setTabSelected(tab.value)}
                  size="xs"
                  key={tab.label}
                  variant="light"
                >
                  {tab.label}
                </Button>
              );
            })}
          </div>
          <hr />
          <Title size={4} as={1}>
            {t('components.Overview.activity')}
          </Title>
          <table className=" border-separate [border-spacing:1rem] md:col-span-2 ">
            <thead>
              <tr className="mb-5 border-b">
                <th className="text-left text-xs">{t<string>('components.Overview.type')}</th>
                <th className="text-left text-xs">{t<string>('components.Overview.total')}</th>
                <th className="text-left text-xs">
                  {t<string>('components.Overview.operationId')}
                </th>
                <th className="text-right text-xs">{t<string>('components.Overview.date')}</th>
              </tr>
            </thead>
            {renderActivity()}
          </table>
        </div>
      </div>
    </MainLayout>
  );
};
