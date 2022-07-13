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
                  {t('compensations.Details.viewTxn')}
                </Link>
                <div></div>
                {compensation.data?.consolidation_certificate_ipfs_cid ? (
                  <Link
                    href={`${IPFS_GATEWAY_URL}${compensation.data?.consolidation_certificate_ipfs_cid}`}
                    className="inline-flex items-center"
                    as="button"
                    size="md"
                  >
                    {t('compensations.Details.downloadCertificate')}
                  </Link>
                ) : (
                  <Button onClick={() => null} size="md" disabled>
                    {t('compensations.Details.downloadCertificate')}
                  </Button>
                )}
              </div>
            </div>
          </Card>
          {compensation.data?.state === 'claimed' ? (
            <Card>
              <div className="space-y-4">
                <Title size={5} as={2}>
                  Your compensation NFT
                </Title>
                <p>
                  Thank you for offsetting your carbon footprint. You can view you compensation NFT.
                </p>
                <div className="grid grid-cols-3 ">
                  <Link
                    as="button"
                    size="md"
                    href={`${EXPLORER_URL}asset/${compensation.data?.compensation_nft?.asa_id}`}
                  >
                    View compensation nft
                  </Link>
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="space-y-4">
                <Title size={5} as={2}>
                  Claim your compensation NFT
                </Title>
                <p className="text-sm text-neutral-4">
                  Claim the compensation NFT to show everyone how much you care for the planet!
                </p>
                <p></p>
                <div className="grid grid-cols-3 ">
                  <div className="col-span-2" />
                  {compensation.data?.state === 'minted' && (
                    <Button
                      onClick={handleClaimCertificate}
                      disabled={claimCertificate.isLoading}
                      size="md"
                    >
                      Claim certificate NFT
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};
