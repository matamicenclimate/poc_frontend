import { MainLayout } from '@/componentes/Layout/MainLayout';
import { Link } from '@/componentes/Elements/Link/Link';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';
import { Head } from '@/componentes/Layout/Head';
import { Title } from '@/componentes/Elements/Title/Title';
import { Pill } from '@/componentes/Elements/Pill/Pill';
import OverviewImage from '../../../assets/images/overview.jpg';
import { Button } from '@/componentes/Elements/Button/Button';
import { useEffect, useState } from 'react';
import { useWalletContext } from '@/providers/Wallet.context';
import { useCurrencyContext } from '@/providers/Currency.context';
import { Icon } from '@/componentes/Icon/Icon';

export const Overview = () => {
  const { t } = useTranslation();

  const tableData = [
    {
      type: t('components.Overview.buy'),
      total: '641,20 CC',
      operationId: '3DkQyAdif6kQLPMBudsa23rfew',
      date: '02-02-2022  21:12',
    },
    {
      type: t('components.Overview.sell'),
      total: '332,12 CC',
      operationId: '23fasfaDkQyAdif6kQLdsaPMBu',
      date: '02-02-2022  21:12',
    },
    {
      type: t('components.Overview.transfer'),
      total: '112,10 CC',
      operationId: '3tr6uffgDkQygfeAdif6kQLPMBu',
      date: '02-02-2022  21:12',
    },
    {
      type: t('components.Overview.offset'),
      total: '112,10 CC',
      operationId: '3tr6uffgDkQygfeAdif6kQLPMBu',
      date: '02-02-2022  21:12',
    },
  ];

  const [filterTable, setfilterTable] = useState(tableData);

  useEffect(() => {
    setfilterTable(tableData);
  }, [t]);

  const tabs = [
    t('components.Overview.all'),
    t('components.Overview.buy'),
    t('components.Overview.sell'),
    t('components.Overview.transfer'),
    t('components.Overview.offset'),
  ];

  const filtredActivity = (type: string) => {
    if (type !== t('components.Overview.all')) {
      setfilterTable(tableData.filter((el) => el.type === type));
    } else {
      setfilterTable(tableData);
    }
  };

  const { climatecoinBalance } = useWalletContext();
  const { formatter } = useCurrencyContext();
  return (
    <MainLayout title={t('misc.Overview.title')}>
      <Head title={t('misc.Overview.title')} />

      <div id="top-row" className="flex flex-col p-8">
        <div className="mt-5 grid md:grid-cols-3">
          <div id="price-panel" className="flex flex-col gap-6">
            <Title size={4} as={1}>
              {t('misc.Overview.title')}
            </Title>
            <p className="text-sm font-medium text-neutral-3">
              {t('components.Overview.totalBalance')}
            </p>
            <div>
              <div className="flex items-center">
                <p className="mr-2 text-6xl text-neutral-2">
                  {t('intlNumber', { val: climatecoinBalance().toFixed(2) })}
                </p>
                <div className="h-[1.625rem] w-[6.6875rem] text-center">
                  <Pill key="climatecoin" style="solid" variant="popular">
                    Climatecoins
                  </Pill>
                </div>
              </div>
              <p className="text-2xl text-neutral-4">
                {formatter(climatecoinBalance() * (40 * 100))}
              </p>
            </div>
            <div className="w-[17.8125rem] space-y-4">
              <Link size="sm" as="button" variant="primary" to="/">
                {t('components.Overview.footprint')}
              </Link>
              <Link size="sm" variant="light" to="/" as="button">
                {t('components.Overview.buyClimatecoins')}
              </Link>
            </div>
          </div>
          <div id="graphic-panel" className="col-span-2" />
        </div>
      </div>

      <div id="bottom-row" className="grid gap-7 md:grid-cols-3">
        <div
          id="view-more-panel"
          className="flex h-[27.25rem] flex-col justify-end rounded-xl bg-cover bg-center px-8 pb-6 text-neutral-9 "
          style={{ backgroundImage: `url(${OverviewImage})` }}
        >
          <Title size={4} as={3}>
            {t('components.Overview.viewMore.title')}
          </Title>
          <p className="text-sm text-neutral-6">{t('components.Overview.viewMore.subtitle')}</p>
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
                <Button onClick={() => filtredActivity(tab)} size="sm" key={tab} variant="light">
                  {tab}
                </Button>
              );
            })}
          </div>
          <hr />
          <Title size={4} as={1}>
            {t('components.Overview.activity')}
          </Title>
          <table className="w-full border-separate [border-spacing:1rem]">
            <thead>
              <tr className="mb-5 border-b">
                <th className="text-left"> {t('components.Overview.type')}</th>
                <th className="text-left"> {t('components.Overview.total')}</th>
                <th className="text-left"> {t('components.Overview.operationId')}</th>
                <th className="text-right"> {t('components.Overview.date')}</th>
              </tr>
            </thead>
            <tbody>
              {filterTable.map((data, i) => {
                return (
                  <tr key={i}>
                    <td className="inline-block" key="type">
                      <Pill
                        key={data.type}
                        style="solid"
                        variant={
                          data.type === t('components.Overview.buy')
                            ? 'featured'
                            : data.type === t('components.Overview.sell')
                            ? 'popular'
                            : data.type === t('components.Overview.offset')
                            ? 'comingSoon'
                            : 'new'
                        }
                      >
                        {data.type}
                      </Pill>
                    </td>
                    <td key="total">{data.total}</td>
                    <td key="operation">{data.operationId}</td>
                    <td className="text-right" key="date">
                      {data.date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};
