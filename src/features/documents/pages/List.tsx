import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';
import { Link } from '@/componentes/Elements/Link/Link';
import { getDocuments } from '../api/getDocuments';
import { Card } from '@/componentes/Card/Card';
import { Pill } from '@/componentes/Elements/Pill/Pill';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import { ProjectPreview } from '../components/ProjectPreview';
import { useTranslation } from 'react-i18next';

export const DocumentList = () => {
  const { user } = useAuth();
  const documents = getDocuments(user?.email as string);
  const { t } = useTranslation();
  const renderDocuments = () => {
    if (documents.data) {
      return (
        <ul className="flex flex-col gap-4">
          {documents.data.map((document) => (
            <Card key={document._id}>
              <div className="flex justify-end">
                <Pill>{document.status}</Pill>
              </div>
              <ProjectPreview values={document} />
              <div>
                <Link to={`/documents/${document._id}`} as="button" size="sm">
                  {t('documents.List.viewDetails')}
                </Link>
              </div>
            </Card>
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
      <PageTitle
        title={t('documents.List.title')}
        description={t('documents.Upload.description')}
        link={
          <Link to="/documents/upload" as="button">
            {t('uploadDocuments.link')}
          </Link>
        }
      />
      {renderDocuments()}
    </MainLayout>
  );
};
