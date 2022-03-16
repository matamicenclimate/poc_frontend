import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';
import { t } from 'i18next';
import { Link } from '@/componentes/Elements/Link/Link';
import { getDocuments } from '../api/getDocuments';
import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';
import { Title } from '@/componentes/Elements/Title/Title';

export const DocumentList = () => {
  const { user } = useAuth();
  const documents = getDocuments(user?.email as string);

  const renderDocuments = () => {
    if (documents.data) {
      return (
        <ul className="flex flex-col gap-4">
          {documents.data.map((document) => (
            <li key={document._id} className="flex flex-col border">
              <div>{document._id}</div>
              <div>
                <Title size={3}>{document.title}</Title>
              </div>
              <div>{document.status}</div>
              <Link to={`/documents/${document._id}`}>{t('documents.List.viewDetails')}</Link>
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
      <Breadcrumb links={[{ to: '/documents/list', label: t('documents.List.breadcrumbTitle') }]} />
      <div className="flex items-center justify-between">
        <Title size={1}>{t('documents.List.title')}</Title>
        <Link to="/documents/upload" as="button">
          {t('uploadDocuments.link')}
        </Link>
      </div>

      {renderDocuments()}
    </MainLayout>
  );
};