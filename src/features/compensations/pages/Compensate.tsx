import { useTranslation } from 'react-i18next';

import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import { useWalletContext } from '@/providers/Wallet.context';

import { CompensateForm } from '../components/CompensateForm';

export const Compensate = () => {
  const { t } = useTranslation();
  const { account } = useWalletContext();

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
    </>
  );
};
