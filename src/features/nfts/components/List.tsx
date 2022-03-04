import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';
import { Link } from '@/componentes/Elements/Link/Link';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useTranslation } from 'react-i18next';
import { getNFTs } from '../api/getNFTs';

export const NFTList = () => {
  const nfts = getNFTs();
  const { t } = useTranslation();

  const renderNfts = () => {
    if (nfts.data) {
      return (
        <ul className="grid grid-cols-3 gap-4">
          {nfts.data.map((nft) => (
            <li key={nft._id} className="flex flex-col border">
              <div>{nft._id}</div>
              <div>
                <h3>{nft.asa_id}</h3>
              </div>
              <div>{nft.status}</div>
              <Link to={`/nfts/${nft._id}`}>{t('nfts.List.viewDetails')}</Link>
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
      <Breadcrumb links={[{ to: '/nfts/list', label: t('nfts.List.breadcrumbTitle') }]} />
      <h1>{t('nfts.List.title')}</h1>

      {renderNfts()}
    </MainLayout>
  );
};
