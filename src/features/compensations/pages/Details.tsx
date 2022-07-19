import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Card } from '@/componentes/Card/Card';
import { Button } from '@/componentes/Elements/Button/Button';
import { Link } from '@/componentes/Elements/Link/Link';
import { Title } from '@/componentes/Elements/Title/Title';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import { Stepper } from '@/componentes/Stepper/Stepper';
import { EXPLORER_URL, IPFS_GATEWAY_URL } from '@/config';

import { useClaimCertificate } from '../api/claimCertificate';
import { useGetCompensation } from '../api/getCompensation';
import { usePrepareClaimCertificate } from '../api/prepareClaimCertificate';
import { CompensateSteps } from '../components/CompensateForm';

export const CompensationDetails = () => {
  const { t } = useTranslation();

  const { compensationId } = useParams();
  const compensation = useGetCompensation(compensationId);
  const prepareClaimCertificate = usePrepareClaimCertificate();
  const claimCertificate = useClaimCertificate();

  const handleClaimCertificate = () => {
    if (compensationId == null) return;

    prepareClaimCertificate.mutate(compensationId, {
      onSuccess: (receiptClaimTxns) => claimCertificate.mutate(receiptClaimTxns),
    });
  };

  const pendingState =
    compensation.data?.state !== 'minted' &&
    compensation.data?.state !== 'claimed' &&
    compensation.data?.state !== 'rejected';

  const approvedState =
    compensation.data?.state === 'minted' || compensation.data?.state === 'claimed';

  const rejectedState = compensation.data?.state === 'rejected';

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
                {pendingState && '🚨  ' + t('compensations.Compensate.steps.pending.title')}
                {approvedState && '🎉  ' + t('compensations.Compensate.steps.approved.title')}
                {rejectedState && '❌  ' + t('compensations.Compensate.steps.rejected.title')}
              </Title>
              <p className="text-sm text-neutral-4">
                {pendingState && t('compensations.Compensate.steps.pending.claim')}
                {approvedState && t('compensations.Compensate.steps.confirmation.claim')}
                {rejectedState && t('compensations.Compensate.steps.rejected.claim')}
              </p>
              <div className="grid grid-cols-3 ">
                <Link
                  as="button"
                  variant="light"
                  size="md"
                  href={`${EXPLORER_URL}tx/group/${encodeURIComponent(
                    compensation.data?.txn_id as string
                  )}`}
                  className="inline-flex items-center"
                >
                  {t('compensations.Compensate.steps.confirmation.viewTxn')}
                </Link>
                <div></div>
                {compensation.data?.consolidation_certificate_ipfs_cid ? (
                  <Link
                    href={`${IPFS_GATEWAY_URL}${compensation.data?.consolidation_certificate_ipfs_cid}`}
                    className="inline-flex items-center"
                    as="button"
                    size="md"
                  >
                    {t('compensations.Compensate.steps.confirmation.certificate')}
                  </Link>
                ) : (
                  <Button onClick={() => null} size="md" disabled>
                    {t('compensations.Compensate.steps.confirmation.certificate')}
                  </Button>
                )}
              </div>
            </div>
          </Card>
          {compensation.data?.state === 'claimed' && (
            <Card>
              <div className="space-y-4">
                <Title size={5} as={2}>
                  {t('compensations.Compensate.steps.claimed.title')}
                </Title>
                <p>{t('compensations.Compensate.steps.claimed.claim')}</p>
                <div className="grid grid-cols-3 ">
                  <Link
                    as="button"
                    size="md"
                    href={`${EXPLORER_URL}asset/${compensation.data?.compensation_nft?.asa_id}`}
                  >
                    {t('compensations.Compensate.steps.claimed.viewNft')}
                  </Link>
                </div>
              </div>
            </Card>
          )}
          {compensation.data?.state === 'minted' && (
            <Card>
              <div className="space-y-4">
                <Title size={5} as={2}>
                  {t('compensations.Compensate.steps.claimed.card.title')}
                </Title>
                <p className="text-sm text-neutral-4">
                  {t('compensations.Compensate.steps.claimed.card.claim')}
                </p>
                <p></p>
                <div className="grid grid-cols-3 ">
                  <Button
                    onClick={handleClaimCertificate}
                    disabled={claimCertificate.isLoading}
                    size="md"
                  >
                    {t('compensations.Compensate.steps.claimed.card.finalClaim')}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};
