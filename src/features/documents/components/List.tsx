import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';
import { getDocuments } from '../api/getDocuments';

export const DocumentList = () => {
  const { user } = useAuth();
  const documents = getDocuments(user?.email as string);

  const renderDocuments = () => {
    if (documents.data) {
      return (
        <div className="flex gap-4">
          <pre>{JSON.stringify(documents.data, null, 2)}</pre>
        </div>
      );
    }
    if (documents.error instanceof Error) {
      return <>{('An error has occurred: ' + documents.error.message) as string}</>;
    }
    return <>{'Loading...'}</>;
  };
  return (
    <MainLayout>
      <h1>List of documents</h1>
      {renderDocuments()}
    </MainLayout>
  );
};
