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
        <Spinner size="md" />
      )}
      <div className="col-span-3">
        <CompensationHistory data={compensations} />
      </div>
    </>
  );
};
