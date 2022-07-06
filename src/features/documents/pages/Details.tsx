import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Card } from '@/componentes/Card/Card';
import { DataRenderer } from '@/componentes/DataRenderer/DataRenderer';
import { Dl, DlItem } from '@/componentes/DescriptionList';
import { Button } from '@/componentes/Elements/Button/Button';
import { Link } from '@/componentes/Elements/Link/Link';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { Title } from '@/componentes/Elements/Title/Title';
import { Icon } from '@/componentes/Icon/Icon';
import { Aside, menuProps } from '@/componentes/Layout/Aside/Aside';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { EXPLORER_URL } from '@/config';
import { CarbonDocument } from '@/features/documents';
import { useOptinToAsset } from '@/features/wallet';
import { useAuth } from '@/lib/auth';
import { useCurrencyContext } from '@/providers/Currency.context';
import { useWalletContext } from '@/providers/Wallet.context';

import { useClaimNftFromDocument } from '../api/useClaimNftFromDocument';
import { useGetDocument } from '../api/useGetDocument';
import { SwapNft } from '../components/SwapNft';

export const DocumentDetails = () => {
  const { documentId } = useParams();
  const { t } = useTranslation();
  const auth = useAuth();
  const document = useGetDocument(documentId as string);
  const claimNft = useClaimNftFromDocument();
  const { account, hasOptedIn } = useWalletContext();
  const optinToAsset = useOptinToAsset();
  const { formatter, climatecoinValue } = useCurrencyContext();
  const currency = useCurrencyContext();

  const handleClaim = async () => {
    if (!document.data || !account?.address || !document.data.developer_nft.asa_id)
      return console.error('Missing parametes');
    await claimNft.mutateAsync({
      documentId: documentId as string,
      email: auth.user?.email as string,
      assetId: Number(document.data.developer_nft?.asa_id),
    });
  };

  const notifications: menuProps[] = [
    {
      icon: 'email-line',
      activeIcon: 'email-line',
      label: t('documents.Details.menu.notifications'),
      to: '/notifications',
    },
  ];
  const projectMenu: menuProps[] = [
    {
      icon: 'shopping-bag',
      activeIcon: 'shopping-bag',
      label: t('documents.Details.menu.projectDetails'),
      to: `/documents/${document?.data?.id}`,
    },
    {
      icon: 'arrow-right-line',
      activeIcon: 'arrow-right-line',
      label: t('documents.Details.menu.offers'),
      to: '/notifications',
    },
    {
      icon: 'wallet-line',
      activeIcon: 'wallet-line',
      label: t('documents.Details.menu.projectWallet'),
      to: '/wallet',
    },
  ];

  return (
    <MainLayout>
      <div className="my-10 flex flex-row items-center ">
        <Link to="/documents/list" className="text-neutral-5 no-underline hover:text-neutral-4">
          <Title size={3} as={1}>
            {t('documents.detail.title')}
          </Title>
        </Link>
        <Icon id="arrow-right-neutral-5" className="h-14 w-14" />
        <Title size={3} as={1} className="text-black">
          {document?.data?.title}
        </Title>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <aside className="text-sm text-neutral-4 md:pr-14">
          <div
            style={{ backgroundImage: `url(${document.data?.thumbnail?.url})` }} // alt={document.data?.title}
            className="h-56 w-full rounded-lg bg-neutral-6 bg-cover bg-center "
          />
          <div className="mb-4 mt-5 flex flex-col capitalize ">
            <div className="text-2xl text-black">{document.data?.status}</div>
            <div className="mt-2 text-lg text-neutral-5">{document.data?.id}</div>
          </div>
          <hr />
          <Aside menu={projectMenu} />
          <hr />
          <Aside menu={notifications} />
        </aside>
        <div className="space-y-4 md:col-span-2">
          <DataRenderer<CarbonDocument>
            data={document}
            render={(document) => (
              <div className="space-y-8">
                <Card>
                  <div className="mb-8 space-y-4">
                    <p className="text-sm text-neutral-4">{document.description}</p>
                  </div>
                  <div className="space-y-8">
                    <Dl>
                      <DlItem dt={'Project'} dd={document.title} />
                      <div className="flex justify-end">
                        {document?.developer_nft ? (
                          <Link
                            href={`${EXPLORER_URL}asset/${document?.developer_nft.asa_id}`}
                            as="button"
                            variant="light"
                            size="sm"
                          >
                            {t('documents.Details.viewAsset')}
                          </Link>
                        ) : (
                          <Button onClick={() => null} variant="light" size="sm" disabled>
                            {t('documents.Details.viewAsset')}
                          </Button>
                        )}
                      </div>
                      <hr className="col-span-2" />
                      <DlItem dt={'Standard'} dd={document.standard.name} />
                      <DlItem dt={'Serial Number'} dd={document.serial_number} />
                      <DlItem dt={'Total Climatecoins'} dd={document.credits} />
                      <DlItem
                        dt={t('documents.Details.total.label', {
                          currency: currency.state.currency,
                        })}
                        dd={formatter(climatecoinValue(Number(document.credits)))}
                      />
                      <hr className="col-span-2" />
                      <DlItem dt={'ID Project'} dd={document.id} />
                      <DlItem dt={'Registry'} dd={document.registry.name} />
                    </Dl>
                    <div className="grid grid-cols-3 gap-4 text-sm text-neutral-4">
                      {document.status === 'completed' && (
                        <p className="col-span-2 col-start-2 text-2xl text-green-700">
                          Waiting for the mint
                        </p>
                      )}
                      {document.status === 'minted' && (
                        <>
                          <div />
                          {claimNft.isLoading && (
                            <div className="flex items-center justify-end">
                              <Spinner size="md" />
                            </div>
                          )}
                          <Button
                            className="col-start-3"
                            size="xs"
                            onClick={handleClaim}
                            disabled={!account?.address || claimNft.isLoading}
                          >
                            {t('documents.Details.button.claim')}
                          </Button>
                        </>
                      )}
                      {!hasOptedIn(Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID as string)) && (
                        <div className="col-span-3">
                          <Card>
                            <Title size={5} as={2}>
                              {t('documents.Details.optIn.title')}
                            </Title>
                            <div className="mb-2">{t('documents.Details.optIn.message')}</div>
                            <Button
                              onClick={() =>
                                optinToAsset.mutate(
                                  Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID as string)
                                )
                              }
                              size="xs"
                            >
                              {t('documents.Details.optIn.title')}
                            </Button>
                          </Card>
                        </div>
                      )}
                      {!!document.developer_nft &&
                        document.status === 'claimed' &&
                        account &&
                        !!hasOptedIn(
                          Number(process.env.REACT_APP_CLIMATECOIN_ASA_ID as string)
                        ) && (
                          <>
                            {/* TO DO: the NFT cannot be deleted because once created, it already exists on the blockchain */}
                            {/* <Button variant="danger" size="xs" disabled>
                            {t('documents.Details.button.deleteNft')}
                          </Button> */}
                            <div />
                            <SwapNft document={document} account={account?.address} />
                          </>
                        )}
                    </div>
                  </div>
                </Card>
              </div>
            )}
          />
        </div>
      </div>
    </MainLayout>
  );
};
