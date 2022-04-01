import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { useAuth } from '@/lib/auth';
import { Link } from '@/componentes/Elements/Link/Link';
import { getDocuments } from '../api/getDocuments';
import { Pill } from '@/componentes/Elements/Pill/Pill';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input } from '@/componentes/Form/Inputs';
import { Title } from '@/componentes/Elements/Title/Title';
import Popover from '@/componentes/Popover/Popover';
import { Button } from '@/componentes/Elements/Button/Button';
import { DayPickerRange } from '@/componentes/Form/DayPickerRange';
import { ReactComponent as UpDownArrow } from '@/assets/icons/bx-up-down-arrow.svg';

export const DocumentList = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const methods = useForm<any>({
    mode: 'onBlur',
  });
  const baseInputProps = {
    register: methods.register,
    control: methods.control,
    errors: methods.formState.errors,
    wrapperClassName: 'col-span-2',
  };

  const documents = getDocuments(user?.email as string, methods.watch());

  const renderDocuments = () => {
    if (documents.data) {
      return (
        <>
          {documents.data.map((document) => (
            <tr key={document._id}>
              <td>
                <Pill>{document.status}</Pill>
              </td>
              <td>{document.title}</td>
              <td>{document.serial_number}</td>
              <td>
                <Link to={`/documents/${document._id}`}>{t('documents.List.viewDetails')}</Link>
              </td>
            </tr>
          ))}
        </>
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
      <div className="grid gap-8 md:grid-cols-4">
        <aside>
          <img src={`https://robohash.org/${user?.email}`} className="h-36 rounded-full" />
          <div>Hi, {user?.username}</div>
          <hr />
          <ul className="my-2 space-y-1">
            <li className="px-6 py-2">My buys</li>
            <li className="px-6 py-2">My solds</li>
            <li className="px-6 py-2">My projects</li>
          </ul>
          <hr />
          <ul>
            <li>Edit profile</li>
            <li>Notifications</li>
            <li>My wallet</li>
          </ul>
        </aside>
        <main className="md:col-span-3">
          <form className="flex">
            <Title size={5} as={3}>
              My projects
            </Title>
            <div className="flex-grow" />
            <Input name="title_contains" type="text" placeholder="Search" {...baseInputProps} />
            <div>
              <Popover>
                <Popover.Button>
                  <Button type="button" variant="light" size="sm">
                    Today
                  </Button>
                </Popover.Button>
                <Popover.Panel config={{ placement: 'bottom-end' }}>
                  <div className="p-4">
                    <DayPickerRange name="dates" {...baseInputProps} />
                  </div>
                </Popover.Panel>
              </Popover>
            </div>
          </form>
          <table className="w-full">
            <thead>
              <th>
                <div className="flex">
                  Status
                  <UpDownArrow />
                </div>
              </th>
              <th>
                <div className="flex">
                  Project name
                  <UpDownArrow />
                </div>
              </th>
              <th className="flex">
                <div className="flex">
                  ID Operation
                  <UpDownArrow />
                </div>
              </th>
              <th>Actions</th>
            </thead>
            <tbody>{renderDocuments()}</tbody>
          </table>
        </main>
      </div>
    </MainLayout>
  );
};
