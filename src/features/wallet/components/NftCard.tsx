import { Card } from '@/componentes/Card/Card';
import { UseQueryResult } from 'react-query';
import { Title } from '@/componentes/Elements/Title/Title';
import { CarbonDocument } from '@/features/documents';
import { Link } from '@/componentes/Elements/Link/Link';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { useClaimNftFromDocument } from '@/features/documents/api/useClaimNftFromDocument';

export const NftCard = ({ data }: { data: UseQueryResult<CarbonDocument[]> }) => {
  const renderDocument = () => {
    if (data.data) {
      return (
        <div className="grid grid-cols-3 divide-y">
          {data.data.map((document) => (
            <Card key={document.developer_nft.asa_id}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-2xl">{document.developer_nft.supply} CC</div>
                  <Link
                    href={`${process.env.REACT_APP_ALGORAND_EXPLORER_URL}asset/${document.developer_nft.asa_id}`}
                    className="inline-flex items-center text-xs"
                  >
                    View asset{' '}
                    <img src="/icons/algoexplorer.png" className="h-3 w-3 rounded-full" />
                  </Link>
                </div>
                <pre className="overflow-scroll bg-slate-200 p-2 text-xs">
                  {JSON.stringify(document.developer_nft.metadata, null, 2)}
                </pre>
                <Link to={`/documents/${document.id}`} as="button" className="w-full" size="sm">
                  Swap NFT
                </Link>
              </div>
            </Card>
          ))}
        </div>
      );
    }
    if (data.error instanceof Error) {
      return <>{('An error has occurred: ' + data.error.message) as string}</>;
    }
    return (
      <div>
        <Spinner />
      </div>
    );
  };
  return (
    <>
      <Title size={4} as={2}>
        Unclaimed Nfts
      </Title>
      {renderDocument()}
    </>
  );
};
