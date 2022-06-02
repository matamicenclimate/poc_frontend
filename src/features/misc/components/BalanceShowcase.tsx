import { useTranslation } from 'react-i18next';
import { ChartBalance } from '@/features/wallet';
import { useCurrencyContext } from '@/providers/Currency.context';
import { UseQueryResult } from 'react-query';
import { Pill } from '@/componentes/Elements/Pill/Pill';
import { BalanceChart } from './BalanceChart';
import { Link } from '@/componentes/Elements/Link/Link';
import { CLIMATECOIN_ASA_ID } from '@/config';

export function BalanceShowcase({
  climatecoinBalance,
  chartBalance,
}: {
  climatecoinBalance: () => number;
  chartBalance: UseQueryResult<ChartBalance>;
}) {
  const { t } = useTranslation();
  const { formatter } = useCurrencyContext();

  return (
    <div className="grid gap-16 md:grid-cols-3">
      <div id="price-panel" className="flex flex-col gap-3">
        <p className="text-sm font-medium text-neutral-3">
          {t('components.Overview.totalBalance')}
        </p>
        <div className="leading-tight">
          <div className="flex items-center">
            <p className="mr-2 text-6xl text-neutral-2">
              {t('intlNumber', { val: climatecoinBalance().toFixed(2) })}
            </p>
            <div className="h-[1.625rem] w-[6.6875rem] text-center">
              <Pill style="solid" variant="popular">
                Climatecoins
              </Pill>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-2xl text-neutral-4">{formatter(climatecoinBalance() * 10)}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <Link size="sm" as="button" variant="primary" to="/coins/compensate">
            {t('components.Overview.footprint')}
          </Link>
          <Link size="sm" variant="light" to="/coins/buy" as="button">
            {t('components.Overview.buyClimatecoins')}
          </Link>
        </div>
      </div>
      <div id="graphic-panel" className="col-span-2 flex flex-col text-sm">
        <div className="flex-grow" />
        <div>
          <BalanceChart
            data={chartBalance.data?.data}
            labels={chartBalance.data?.labels}
            width={500}
          />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <Link
            href={`${process.env.REACT_APP_ALGORAND_EXPLORER_URL}asset/${CLIMATECOIN_ASA_ID}`}
            className="flex items-center"
          >
            View in explorer <img src="/icons/algoexplorer.png" className="h-3 w-3 rounded-full" />
          </Link>
          <p className="text-right">
            🌱 You have enough climatecoins to clean <Link to="#">a football stadium</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
