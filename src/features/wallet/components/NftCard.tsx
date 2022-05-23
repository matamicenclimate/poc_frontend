import { Card } from '@/componentes/Card/Card';
import { UseQueryResult } from 'react-query';
import { Title } from '@/componentes/Elements/Title/Title';
import { CarbonDocument } from '@/features/documents';
import { Link } from '@/componentes/Elements/Link/Link';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';

export const NftCard = ({ data }: { data: UseQueryResult<CarbonDocument[]> }) => {
  const renderDocument = () => {
    if (data.data) {
      return (
        <div className="grid grid-cols-3 divide-y">
          {data.data.map((document) => (
            <Card key={document.developer_nft.asa_id}>
              <div>
                <Link
                  href={`${process.env.REACT_APP_ALGORAND_EXPLORER_URL}asset/${document.developer_nft.asa_id}`}
                  className="inline-flex items-center text-xs"
                >
                  View asset <img src="/icons/algoexplorer.png" className="h-3 w-3 rounded-full" />
                </Link>
              </div>
              <div>{document.developer_nft.supply} CC</div>
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
