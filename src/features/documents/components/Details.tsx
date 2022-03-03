import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';
import { Button } from '@/componentes/Elements/Button/Button';
import { Link } from '@/componentes/Elements/Link/Link';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getDocument } from '../api/getDocument';
import { mintNftDocument } from '../api/mintNftDocument';

export const DocumentDetails = () => {
  const { documentId } = useParams();
  const { t } = useTranslation();
  const document = getDocument(documentId as string);
  const mintDocument = mintNftDocument();

  const renderDocument = () => {
    if (document.data) {
      const showBlockchainData =
        ['claimed', 'minted', 'completed'].includes(document.data.status as string) &&
        process.env.NODE_ENV === 'development';
      return (
        <>
          <div className="flex flex-col gap-4">
            <h1>{document.data.title}</h1>
            <div>sn: {document.data.serial_number}</div>
            <div>amt: {document.data.credits}</div>
            <div>{document.data.status}</div>
            <div>createdAt: {document.data.createdAt}</div>
            <div>updatedAt: {document.data.updatedAt}</div>
            <div>
              <Link href={document.data.document?.url}>preview</Link>
            </div>
            {showBlockchainData ? (
              <div className="border p-2">
                <div>
                  mint group:{' '}
                  <Link
                    href={`https://testnet.algoexplorer.io/tx/group/${encodeURIComponent(
                      document.data.minted_group_id as string
                    )}`}
                  >
                    {document.data.minted_group_id}
                  </Link>
                </div>
                <div>
                  minted asa:{' '}
                  <Link
                    href={`https://testnet.algoexplorer.io/asset/${document.data.minted_supplier_asa_id}`}
                  >
                    {document.data.minted_supplier_asa_id}
                  </Link>
                </div>
                <div>
                  minted asa txn:{' '}
                  <Link
                    href={`https://testnet.algoexplorer.io/tx/${document.data.minted_supplier_asa_txn_id}`}
                  >
                    {document.data.minted_supplier_asa_txn_id}
                  </Link>
                </div>
                <div>
                  fee asa:{' '}
                  <Link
                    href={`https://testnet.algoexplorer.io/asset/${document.data.minted_climate_asa_id}`}
                  >
                    {document.data.minted_climate_asa_id}
                  </Link>
                </div>
                <div>
                  fee asa txn:{' '}
                  <Link
                    href={`https://testnet.algoexplorer.io/tx/${document.data.minted_climate_asa_txn_id}`}
                  >
                    {document.data.minted_climate_asa_txn_id}
                  </Link>
                </div>
                <div>
                  {mintDocument.isLoading ? <Spinner /> : null}
                  <Button
                    onClick={() => mintDocument.mutate(document.data._id as string)}
                    disabled={mintDocument.isLoading}
                  >
                    mint
                  </Button>
                  <Button onClick={() => console.log('todo')}>claim</Button>
                </div>
              </div>
            ) : null}
          </div>
        </>
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
      <Breadcrumb
        links={[
          { to: '/documents', label: t('documents.List.breadcrumbTitle') },
          {
            to: `/documents/${documentId}`,
            label: document.data ? (document.data.title as string) : (documentId as string),
          },
        ]}
      />
      {renderDocument()}
    </MainLayout>
  );
};
