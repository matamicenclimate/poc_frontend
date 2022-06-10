import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Card } from '@/componentes/Card/Card';
import { Button } from '@/componentes/Elements/Button/Button';
import { Link } from '@/componentes/Elements/Link/Link';
import { Title } from '@/componentes/Elements/Title/Title';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import { Stepper } from '@/componentes/Stepper/Stepper';
import { EXPLORER_URL } from '@/config';
import { useWalletContext } from '@/providers/Wallet.context';

import { useGetCompensation } from '../api/getCompensation';
import { CompensateSteps } from './Compensate';

export const CompensationDetails = () => {
  const { t } = useTranslation();
  const { account, climatecoinBalance } = useWalletContext();

  const { compensationId } = useParams();
  const compensation = useGetCompensation(compensationId);

  return (
    <>
      <PageTitle
        title={t('compensations.Compensate.title')}
        description={t('compensations.Compensate.description')}
        linkTo=""
      />
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <Stepper
            stepsEnum={CompensateSteps}
            setCurrStep={() => null}
            currStep={3}
            translationRoot="compensations.Compensate.stepper"
          />
        </div>
        <div className="flex flex-col space-y-8 md:col-span-2">
          <Card>
            <div className="space-y-8">
              <Title size={5} as={2}>
                🎉 {t('compensations.Compensate.steps.confirmation.title')}
              </Title>
              <p className="text-sm text-neutral-4">
                Thank you for helping to offset the carbon footprint, your tokens have been
                successfully burned, you can view the transaction in real time directly on Algorand.
              </p>
              <div className="grid grid-cols-3">
                <Link
                  as="button"
                  variant="light"
                  size="md"
                  href={`${EXPLORER_URL}tx/group/${encodeURIComponent(
                    compensation.data?.txn_id as string
                  )}`}
                  className="inline-flex items-center text-xs"
                >
                  {t('compensations.Details.viewTxn')}
                </Link>
                <div></div>
                <Button size="md" onClick={() => null}>
                  {t('compensations.Details.downloadCertificate')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
