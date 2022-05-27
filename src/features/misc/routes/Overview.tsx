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
import { Icon } from '@/componentes/Icon/Icon';
import { useGetChartData } from '../../wallet/api/useGetChartData';
import { useGetActivities } from '../api/useGetActivities';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { format } from 'date-fns';
import { BalanceShowcase } from '@/features/misc';

const pillVariants: Record<string, PillProps['variant']> = {
  swap: 'swap',
  buy: 'featured',
  sell: 'popular',
  burn: 'popular',
  offset: 'comingSoon',
};

export const Overview = () => {
  const { t } = useTranslation();
  const [tabSelected, setTabSelected] = useState<string | null>(null);

  const activities = useGetActivities(tabSelected);

  const { climatecoinBalance } = useWalletContext();
  const chartBalance = useGetChartData();

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

  const renderActivity = () => {
    if (activities?.data) {
      return (
        <tbody className="text-sm">
          {activities.data.map((data) => {
            return (
              <tr key={data.id}>
                <td>
                  <Pill
                    style="solid"
                    className="text-xs"
                    variant={data.type ? pillVariants[data.type] : 'new'}
                  >
                    {data.type}
                  </Pill>
                </td>
                <td>{t('intlNumber', { val: data.supply }) ?? 0}</td>
                <td>
                  {data.nft ? (
                    <>
                      {data.nft.metadata.description}
                      <br />
                      <Link
                        href={`${process.env.REACT_APP_ALGORAND_EXPLORER_URL}asset/${data.nft.asa_id}`}
                        className="inline-flex items-center text-xs"
                      >
                        View asset{' '}
                        <img src="icons/algoexplorer.png" className="h-3 w-3 rounded-full" />
                      </Link>{' '}
                    </>
                  ) : null}
                  {data.type === 'burn' ? (
                    <>
                      Cliamtecoins compensated
                      <br />
                    </>
                  ) : null}
                  <Link
                    href={
                      data.is_group
                        ? `${
                            process.env.REACT_APP_ALGORAND_EXPLORER_URL
                          }tx/group/${encodeURIComponent(data.group_id as string)}`
                        : `${process.env.REACT_APP_ALGORAND_EXPLORER_URL}tx/${data.txn_id}`
                    }
                    className="inline-flex items-center text-xs"
                  >
                    View txn{' '}
                    <img
                      role="figure"
                      src="icons/algoexplorer.png"
                      className="h-3 w-3 rounded-full"
                    />
                  </Link>
                </td>
                <td className="text-right">{format(new Date(data.date), 'dd/MM/yyyy')}</td>
              </tr>
            );
          })}
        </tbody>
      );
    }
    if (activities.error instanceof Error) {
      return (
        <table>
          <tr>
            <td colSpan={4}>{('An error has occurred: ' + activities.error.message) as string}</td>
          </tr>
        </table>
      );
    }
    return (
      <table>
        <tr>
          <td colSpan={4}>
            <Spinner />
          </td>
        </tr>
      </table>
    );
  };

  return (
    <MainLayout title={t('misc.Overview.title')}>
      <Head title={t('misc.Overview.title')} />

      <div id="top-row" className="flex flex-col p-8">
        <Title size={4} as={1}>
          {t('misc.Overview.title')}
        </Title>
        <BalanceShowcase climatecoinBalance={climatecoinBalance} chartBalance={chartBalance} />
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
          <p className="text-sm text-neutral-6">{t('components.Overview.viewMore.subtitle')}</p>
          <div className="mt-8 ">
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
        <div id="activity-panel" className="flex flex-col space-y-4 md:col-span-2">
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
          <div>
            <table className="w-full border-separate [border-spacing:1rem] md:col-span-2 ">
              <thead>
                <tr className="mb-5 border-b text-left text-xs">
                  <th>{t('components.Overview.type')}</th>
                  <th>{t('components.Overview.total')}</th>
                  <th>{t('components.Overview.operationId')}</th>
                  <th className="text-right ">{t('components.Overview.date')}</th>
                </tr>
              </thead>
              {renderActivity()}
            </table>
            <div className="px-4">
              <Link to={'/'}>View all activity</Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
