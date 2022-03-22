import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';
import { t } from 'i18next';
import { Link } from '@/componentes/Elements/Link/Link';
import { getDocuments } from '../api/getDocuments';
import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';
import { Title } from '@/componentes/Elements/Title/Title';
import { Card } from '@/componentes/Card/Card';
import { Pill } from '@/componentes/Elements/Pill/Pill';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import { ProjectPreview } from '../components/ProjectPreview';

export const DocumentList = () => {
  const { user } = useAuth();
  const documents = getDocuments(user?.email as string);

  const renderDocuments = () => {
    if (documents.data) {
      return (
        <ul className="flex flex-col gap-4">
          {documents.data.map((document) => (
            <Card key={document._id}>
              <ProjectPreview values={document} />
              <div>
                <Link to={`/documents/${document._id}`} as="button">
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
