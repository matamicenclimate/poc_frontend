import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';
import { t } from 'i18next';
import { Link } from '@/componentes/Elements/Link/Link';
import { getDocuments } from '../api/getDocuments';
import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';

export const DocumentList = () => {
  const { user } = useAuth();
  const documents = getDocuments(user?.email as string);

  const renderDocuments = () => {
    if (documents.data) {
      return (
        <ul className="flex flex-col gap-4">
          {documents.data.map((document) => (
            <li key={document._id}>
              <div className="flex   flex-col border">
                <div>{document._id}</div>
                <div>
                  <h3>{document.title}</h3>
                </div>
                <div>{document.status}</div>
                <Link to={`/documents/${document._id}`}>{t('documents.List.viewDetails')}</Link>
              </div>
            </li>
          ))}
        </ul>
      );
    }
    if (documents.error instanceof Error) {
      return <>{('An error has occurred: ' + documents.error.message) as string}</>;
    }
    return <Spinner />;
  };
  return (
    <MainLayout title={t('head.List.title')}>
      <Breadcrumb links={[{ to: '/documents/list', label: 'documents' }]} />
      <div className="flex justify-between">
        <h1>{t('documents.List.title')}</h1>
        <div>
          <Link to="/documents/upload">{t('uploadDocuments.link')}</Link>
        </div>
      </div>

      {renderDocuments()}
    </MainLayout>
  );
};
