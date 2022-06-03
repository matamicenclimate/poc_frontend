import { Card } from '@/componentes/Card/Card';
import { UseQueryResult } from 'react-query';
import { Link } from '@/componentes/Elements/Link/Link';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { Nft } from '@/features/nfts';
import { useWalletContext } from '@/providers/Wallet.context';
import { Button } from '@/componentes/Elements/Button/Button';

export const NftCard = ({ data }: { data: UseQueryResult<Nft[]> }) => {
  const { hasOptedIn } = useWalletContext();
  const renderDocument = () => {
    if (data.data) {
      return (
        <div className="grid grid-cols-3 divide-y">
          {data.data.map((document) => (
            <Card key={document.asa_id}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-2xl">Compensation Certificate</div>
                </div>
                <pre className="overflow-scroll bg-slate-200 p-2 text-xs">
                  {JSON.stringify(document.metadata, null, 2)}
                </pre>
                <div className="space-y-1">
                  <Link
                    href={`${process.env.REACT_APP_ALGORAND_EXPLORER_URL}asset/${document.asa_id}`}
                    className="w-full"
                    as="button"
                    size="sm"
                    variant="dark"
                  >
                    View asset{' '}
                    <img src="/icons/algoexplorer.png" className="h-3 w-3 rounded-full" />
                  </Link>
                  <Link to={`/nfts/${document.id}`} as="button" className="w-full" size="sm">
                    Claim NFT
                  </Link>
                  {!hasOptedIn(Number(document.asa_id)) && <Button variant="primary">Optin</Button>}
                </div>
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
  return <>{renderDocument()}</>;
};
