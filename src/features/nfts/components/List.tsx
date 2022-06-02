import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';
import { Link } from '@/componentes/Elements/Link/Link';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { Title } from '@/componentes/Elements/Title/Title';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useTranslation } from 'react-i18next';
import { useGetNFTs } from '../api/useGetNFTs';
import { Card } from '@/componentes/Card/Card';
import { useGetNFTsByStatus } from '../api/useGetNFTsByStatus';
import { UseQueryResult } from 'react-query';
import { EXPLORER_URL } from '@/config';
import { PageTitle } from '@/componentes/Layout/PageTitle';

export const NFTList = () => {
  // const nfts = useGetNFTs();
  const nfts = useGetNFTsByStatus({ status: 'swapped' });
  const burnedNfts = useGetNFTsByStatus({ status: 'burned' });
  const { t } = useTranslation();

  const renderNfts = (nfts: UseQueryResult<any>) => {
    if (nfts.data) {
      return (
        <ul className="grid grid-cols-3 gap-4">
          {nfts.data.map((nft: any) => (
            <li key={nft._id}>
              <Card>
                <div>Carbon emission credit @ {nft.metadata.standard}</div>
                <div>
                  Available: {nft.supply_remaining}/{nft.supply}
                </div>
                <div className="h-4"></div>
                <div className="flex flex-col space-y-1">
                  <Link to={`/nfts/${nft._id}`} as="button" size="sm">
                    {t('nfts.List.viewDetails')}
                  </Link>
                  <Link
                    href={`${EXPLORER_URL}asset/${encodeURIComponent(nft.asa_id)}`}
                    className="inline-flex items-center"
                    as="button"
                    variant="dark"
                    size="sm"
                  >
                    View asset{' '}
                    <img
                      role="figure"
                      src="/icons/algoexplorer.png"
                      className="ml-2 h-4 w-4 rounded-full"
                    />
                  </Link>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      );
    }
    if (nfts.error instanceof Error) {
      return <>{('An error has occurred: ' + nfts.error.message) as string}</>;
    }
    return <Spinner />;
  };

  return (
    <MainLayout title="NFT List">
      <PageTitle title={t('nfts.List.title')} description={t('nfts.List.description')} linkTo="" />

      <div className="flex items-center">
        <Title size={3} as={2}>
          {t('nfts.List.active')}
        </Title>
        <div className="flex-grow"></div>
        <Link to="/about">More info</Link>
      </div>

      {renderNfts(nfts)}
      <div className="flex items-center">
        <Title size={3} as={2}>
          {t('nfts.List.burned')}
        </Title>
        <div className="flex-grow"></div>
        <Link to="/about">More info</Link>
      </div>

      {renderNfts(burnedNfts)}
    </MainLayout>
  );
};
