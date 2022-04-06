import { useAuth } from '@/lib/auth';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getDocuments } from '../api/getDocuments';
import { Input } from '@/componentes/Form/Inputs';
import Popover from '@/componentes/Popover/Popover';
import { Link } from '@/componentes/Elements/Link/Link';
import { Pill } from '@/componentes/Elements/Pill/Pill';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import { Title } from '@/componentes/Elements/Title/Title';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { Button } from '@/componentes/Elements/Button/Button';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { DayPickerRange } from '@/componentes/Form/DayPickerRange';
import clsx from 'clsx';
import { useSort } from '@/hooks/useSort';
import { Icon } from '@/componentes/Icon/Icon';

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

  const { sort, toggleSort, isActiveSort, renderArrow } = useSort();
  const documents = getDocuments(user?.email as string, methods.watch(), sort);
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
          <div>
            {t('documents.Upload.hi')}
            {user?.username} 👋🏻
          </div>
          <hr />
          <ul className="my-2 space-y-1">
            <li className="flex px-6 py-2">
              <Icon id="arrow-right-line" className="mr-3 h-6 w-6 fill-primary" />
              {t('documents.Upload.buys')}
            </li>
            <li className="flex px-6 py-2">
              <Icon id="arrow-right-line" className="mr-3 h-6 w-6 fill-primary" />
              {t('documents.Upload.sold')}
            </li>
            <li className="flex px-6 py-2 text-primary">
              <Icon id="shopping-bag" className="mr-3 h-6 w-6 fill-primary" />
              {t('documents.Upload.projects')}
            </li>
          </ul>
          <hr />
          <ul className="my-2 space-y-1">
            <li className="flex px-6 py-2">
              <Icon id="user-line" className="mr-3 h-6 w-6" />
              {t('documents.Upload.profile')}
            </li>
            <li className="flex px-6 py-2">
              <Icon id="email-line" className="mr-3 h-6 w-6" />
              {t('documents.Upload.notifications')}
            </li>
            <li className="flex px-6 py-2">
              <Icon id="wallet-line" className="mr-3 h-6 w-6" />
              {t('documents.Upload.wallet')}
            </li>
          </ul>
        </aside>
        <main className="space-y-8 md:col-span-3">
          <form className="flex items-center space-x-2">
            <Title size={5} as={3}>
              {t('documents.List.table.title')}
            </Title>
            <div className="flex-grow" />
            <Input
              name="title_contains"
              type="text"
              placeholder={t('documents.List.table.search')}
              iconLeft={<Icon id="search-line" />}
              {...baseInputProps}
            />
            <div>
              <Popover>
                <Popover.Button
                  render={(isOpen) => (
                    <Button type="button" variant={isOpen ? 'light' : 'primary'} size="sm">
                      Today
                      <Icon id="calendar-line" className="ml-3 h-4 w-4" />
                    </Button>
                  )}
                />
                <Popover.Panel config={{ placement: 'bottom-end' }}>
                  <div className="p-4">
                    <DayPickerRange name="dates" {...baseInputProps} />
                  </div>
                </Popover.Panel>
              </Popover>
            </div>
          </form>
          <table className="w-full">
            <thead className="text-xs text-neutral-4">
              <th>
                <div className={clsx('flex cursor-pointer')} onClick={() => toggleSort('status')}>
                  {t('documents.List.table.status')}
                  {renderArrow('status')}
                </div>
              </th>
              <th>
                <div className={clsx('flex cursor-pointer')} onClick={() => toggleSort('title')}>
                  {t('documents.List.table.projectName')}
                  {renderArrow('title')}
                </div>
              </th>
              <th className="flex">
                <div
                  className={clsx('flex cursor-pointer')}
                  onClick={() => toggleSort('serial_number')}
                >
                  {t('documents.List.table.idOperation')}
                  {renderArrow('serial_number')}
                </div>
              </th>
              <th>{t('documents.List.table.actions')}</th>
            </thead>
            <tbody>{renderDocuments()}</tbody>
          </table>
        </main>
      </div>
    </MainLayout>
  );
};
