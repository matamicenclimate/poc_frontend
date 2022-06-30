import { useTranslation } from 'react-i18next';

import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import { useWalletContext } from '@/providers/Wallet.context';

import { useGetCompensations } from '../api/getCompensations';
import { CompensateForm } from '../components/CompensateForm';
import { CompensationHistory } from '../components/CompensationHistory';

export const Compensate = () => {
  const { t } = useTranslation();
  const { account } = useWalletContext();
  const compensations = useGetCompensations();

  return (
    <>
      <PageTitle
        title={t('compensations.Compensate.title')}
        description={t('compensations.Compensate.description')}
        linkTo=""
      />
      {account?.address ? (
        <CompensateForm defaultAddress={account?.address} />
      ) : (
        <div className="flex justify-center pb-10">
          <Spinner size="xl" />
        </div>
      )}
      <div className="col-span-3 pt-10">
        {compensations.data !== undefined ? (
          <CompensationHistory data={compensations} />
        ) : (
          <div className="flex justify-center">
            <Spinner size="xl" />
          </div>
        )}
      </div>
    </>
  );
};
