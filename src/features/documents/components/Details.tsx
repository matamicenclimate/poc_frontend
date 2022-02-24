import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';
import { Link } from '@/componentes/Elements/Link/Link';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useParams } from 'react-router-dom';
import { getDocument } from '../api/getDocument';

export const DocumentDetails = () => {
  const { documentId } = useParams();

  const document = getDocument(documentId as string);

  const renderDocument = () => {
    if (document.data) {
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
            {/* <pre>{JSON.stringify(document.data, null, 2)}</pre> */}
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
          { to: '/documents', label: 'documents' },
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
