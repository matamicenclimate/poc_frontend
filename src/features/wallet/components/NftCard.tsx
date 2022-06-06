import { Card } from '@/componentes/Card/Card';
import { UseQueryResult } from 'react-query';
import { Link } from '@/componentes/Elements/Link/Link';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { Nft } from '@/features/nfts';
import { useWalletContext } from '@/providers/Wallet.context';
import { Button } from '@/componentes/Elements/Button/Button';
import { EXPLORER_URL, IPFS_GATEWAY_URL } from '@/config';

export const NftCard = ({ data }: { data: UseQueryResult<Nft[]> }) => {
  const { hasOptedIn } = useWalletContext();

  const getIpfsCid = (ipfsUrl: string) => {
    if (ipfsUrl.indexOf('ipfs://') === 0) {
      return ipfsUrl.split('ipfs://')[1];
    }
    return '';
  };

  const renderDocument = () => {
    if (data.data) {
      return (
        <div className="grid grid-cols-3 gap-4 divide-y">
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
                  <div className="grid grid-cols-4 gap-1">
                    <Link
                      to={`/nfts/${document.id}`}
                      className="col-span-2 w-full"
                      as="button"
                      size="sm"
                      variant="dark"
                    >
                      View details
                    </Link>
                    <Link
                      href={`${EXPLORER_URL}asset/${document.asa_id}`}
                      className="w-full"
                      as="button"
                      size="sm"
                      variant="dark"
                    >
                      <img src="/icons/algoexplorer.png" className="h-4 w-5 rounded-full" />
                    </Link>
                    <Link
                      href={`${IPFS_GATEWAY_URL}${getIpfsCid(document.metadata.external_url)}`}
                      className="w-full"
                      as="button"
                      size="sm"
                      variant="dark"
                    >
                      ipfs
                    </Link>
                  </div>
                  <Link to={`/nfts/${document.id}`} as="button" className="w-full" size="sm">
                    {!hasOptedIn(Number(document.asa_id)) ? 'Optin and claim' : 'Claim'}
                  </Link>
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
