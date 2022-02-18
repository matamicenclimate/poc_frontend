import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';
import { useParams } from 'react-router-dom';
import { getDocument } from '../api/getDocument';

export const DocumentDetails = () => {
  const { user } = useAuth();
  const { documentId } = useParams();

  const document = getDocument(documentId as string);

  const renderDocument = () => {
    if (document.data) {
      return (
        <div className="flex gap-4">
          <pre>{JSON.stringify(document.data, null, 2)}</pre>
        </div>
      );
    }
    if (document.error instanceof Error) {
      return <>{('An error has occurred: ' + document.error.message) as string}</>;
    }
    return <>{'Loading...'}</>;
  };

  return (
    <MainLayout>
      <h1>Document</h1>
      {renderDocument()}
    </MainLayout>
  );
};
