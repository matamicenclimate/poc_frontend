import { Card } from '@/componentes/Card/Card';
import { Button } from '@/componentes/Elements/Button/Button';
import { Form } from '@/componentes/Form/Form';
import { Input } from '@/componentes/Form/Inputs';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import { Stepper } from '@/componentes/Stepper/Stepper';
import { useWalletContext } from '@/providers/Wallet.context';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetDocument } from '../api/useGetDocument';
import { ProjectPreview } from '../components/ProjectPreview';
import { UploadSteps } from '../components/UploadForm';
import { useClaimNftFromDocument } from '../api/useClaimNftFromDocument';
import { useAuth } from '@/lib/auth';
import { SwapNft } from '../components/SwapNft';
import { Title } from '@/componentes/Elements/Title/Title';
import { useAlert } from 'react-alert';
import { Link } from '@/componentes/Elements/Link/Link';
import { useOptinToAsset } from '@/features/wallet';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';

export const DocumentDetails = () => {
  const { documentId } = useParams();
  const { t } = useTranslation();
  const auth = useAuth();
  const alert = useAlert();
  const document = useGetDocument(documentId as string);
  const claimNft = useClaimNftFromDocument();
  const { account, hasOptedIn } = useWalletContext();
  const optinToAsset = useOptinToAsset();

  const handleClaim = async () => {
    if (!document.data || !account?.address || !document.data.developer_nft.asa_id) return;
    await claimNft.mutateAsync({
      documentId: documentId as string,
      email: auth.user?.email as string,
      address: account?.address,
      assetId: Number(document.data.developer_nft?.asa_id),
    });
  };

  const renderDocument = () => {
    if (document.data) {
      return (
        <div className="space-y-8">
          <Card>
            <div className="space-y-4 ">
              <Title size={5} as={2}>
                👏🏼 {t('documents.Details.thanks')}
              </Title>
              <p className="text-neutral-4">{t<string>('documents.Details.waitMessage')}</p>
              <p className="text-primary-green">{t<string>('documents.Details.willSendEmail')}</p>
              <div className="p-12">
                <ProjectPreview values={document.data} noDescription />
              </div>
            </div>
          </Card>
          {document.data.status === 'minted' && (
            <Card>
              <div className="space-y-8">
                <Title size={5} as={2}>
                  {t('documents.Details.claim.title')}
                </Title>
                <Form onSubmit={handleClaim} className="flex flex-col gap-4 text-left">
                  <div className="mx-auto flex w-full max-w-sm items-center rounded bg-neutral-7 p-4 text-sm">
                    <div>
                      CO2 tokens <br />
                      to transfer
                    </div>
                    <div className="flex-grow" />
                    <div className="text-right">
                      <div className="text-lg">{document.data.developer_nft?.supply} CO2</div>
                      <Link
                        href={`${process.env.REACT_APP_ALGORAND_EXPLORER_URL}asset/${Number(
                          document.data.developer_nft?.asa_id
                        )}`}
                        className="inline-flex items-center"
                      >
                        {document.data.developer_nft?.asa_id}{' '}
                        <img
                          src="/icons/algoexplorer.png"
                          className="rounded-full"
                          style={{ width: 12, height: 12 }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="mx-auto w-full max-w-sm text-center text-primary">
                    Address to send
                  </div>
                  <div className="mx-auto w-full max-w-sm text-sm text-neutral-4">
                    <>
                      {t('documents.Details.claim.alert')}{' '}
                      <Link to="/">{t('documents.Details.claim.viewMore')}</Link>
                    </>
                  </div>
                  <Input
                    name="address"
                    type="text"
                    defaultValue={account?.address}
                    wrapperClassName="max-w-sm w-full mx-auto"
                    required
                    disabled
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <div />
                    <div className="flex items-center justify-end">
                      {claimNft.isLoading && <Spinner />}
                    </div>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!account?.address || claimNft.isLoading}
                    >
                      Yes, confirm
                    </Button>
                  </div>
                </Form>
              </div>
            </Card>
          )}
          {!hasOptedIn(Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID as string)) && (
            <Card>
              <Title size={5} as={2}>
                Optin to Climatecoin
              </Title>{' '}
              <div>You have to opt-in to receive Climatecoins in order to continue</div>
              <Button
                onClick={() =>
                  optinToAsset.mutateAsync(
                    Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID as string)
                  )
                }
                size="xs"
              >
                opt in to climatecoin
              </Button>
            </Card>
          )}
          {!!document.data.developer_nft && document.data.status === 'claimed' && (
            <Card>
              <Title size={5} as={2}>
                Swap you NFT for Climatecoins
              </Title>
              <SwapNft
                nftAsaId={Number(document.data.developer_nft?.asa_id)}
                nftSupply={Number(document.data.developer_nft?.supply)}
              />
            </Card>
          )}
        </div>
      );
    }

    if (document.error instanceof Error) {
      return <>{('An error has occurred: ' + document.error.message) as string}</>;
    }
    return (
      <div>
        <div>{'Loading...'}</div>
      </div>
    );
  };

  return (
    <MainLayout>
      <PageTitle
        title={t('documents.Upload.title')}
        description={t('documents.Upload.description')}
        linkTo="/"
      />
      <div className="grid md:grid-cols-3">
        <div id="left-column-wrapper" className="">
          <Stepper
            stepsEnum={UploadSteps}
            setCurrStep={() => null}
            currStep={UploadSteps.CONFIRMATION + 1}
            translationRoot="documents.Upload.stepper"
          />
        </div>
        <div className="md:col-span-2">{renderDocument()}</div>
      </div>
    </MainLayout>
  );
};
