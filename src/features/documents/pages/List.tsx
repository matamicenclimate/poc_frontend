import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/componentes/Elements/Button/Button';
import { Link } from '@/componentes/Elements/Link/Link';
import { Pill, PillProps } from '@/componentes/Elements/Pill/Pill';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { Title } from '@/componentes/Elements/Title/Title';
import { DayPickerRange } from '@/componentes/Form/DayPickerRange';
import { Input } from '@/componentes/Form/Inputs';
import { Icon } from '@/componentes/Icon/Icon';
import { Aside } from '@/componentes/Layout/Aside';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import Popover from '@/componentes/Popover/Popover';
import { useSort } from '@/hooks/useSort';
import { useAuth } from '@/lib/auth';

import { useGetDocuments } from '../api/useGetDocuments';

const pillVariants: Record<string, PillProps['variant']> = {
  pending: 'new',
  minted: 'featured',
  swapped: 'comingSoon',
};

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

  const { sort, toggleSort, renderArrow } = useSort();
  const documents = useGetDocuments(user?.email as string, methods.watch(), sort);

  const renderDocuments = () => {
    if (documents.data) {
      return (
        <>
          {documents.data.map((document) => (
            <tr key={document._id} className="text-left">
              <td>
                <div className="flex py-3">
                  <Pill variant={pillVariants[document.status]}>{document.status}</Pill>
                </div>
              </td>
              <td className="text-neutral-2">{document.title}</td>
              <td>{document.serial_number}</td>
              <td className="text-right">
                <Link to={`/documents/${document._id}`}>{t('documents.List.viewDetails')}</Link>
              </td>
            </tr>
          ))}
        </>
      );
    }
    if (documents.error instanceof Error) {
      return (
        <tr>
          <td colSpan={4}>{('An error has occurred: ' + documents.error.message) as string}</td>
        </tr>
      );
    }
    return (
      <tr>
        <td colSpan={4}>
          <div className="flex justify-center p-8">
            <Spinner />
          </div>
        </td>
      </tr>
    );
  };
  return (
    <MainLayout title={t('head.List.title')}>
      <PageTitle
        title={t('documents.List.title')}
        description={t('documents.Upload.description')}
        link={
          <Link to="/documents/upload" as="button" size="sm">
            {t('uploadDocuments.link')}
          </Link>
        }
      />
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-8 md:grid-cols-4">
          <Aside />
          <main className="space-y-4 md:col-span-3">
            <div className="flex items-center space-x-2">
              <Title size={4} as={3}>
                {t('documents.List.table.title')}
              </Title>
              <div className="flex-grow" />
              <Input
                name="title_contains"
                type="text"
                placeholder={t('documents.List.table.search')}
                inputClassName="border-2"
                iconRight={<Icon id="search-line" />}
                {...baseInputProps}
              />
              <div>
                <Popover>
                  <Popover.Button
                    render={(isOpen) => (
                      <Button type="button" variant={isOpen ? 'primary' : 'light'} size="sm">
                        Today
                        <Icon
                          id={isOpen ? 'calendar-line-white' : 'calendar-line'}
                          className="ml-3 h-4 w-4"
                        />
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
            </div>
            <table className="font-Poppins w-full text-sm font-medium text-neutral-4">
              <thead className="border-b-2 border-neutral-6 text-left text-xs text-neutral-4">
                <th>
                  <div
                    className={clsx('flex cursor-pointer p-4')}
                    onClick={() => toggleSort('status')}
                  >
                    <>
                      {t('documents.List.table.status')}
                      {renderArrow('status')}
                    </>
                  </div>
                </th>
                <th>
                  <div
                    className={clsx('flex cursor-pointer  p-4')}
                    onClick={() => toggleSort('title')}
                  >
                    <>
                      {t('documents.List.table.projectName')}
                      {renderArrow('title')}
                    </>
                  </div>
                </th>
                <th className="flex">
                  <div
                    className={clsx('flex cursor-pointer  p-4')}
                    onClick={() => toggleSort('serial_number')}
                  >
                    <>
                      {t('documents.List.table.idOperation')}
                      {renderArrow('serial_number')}
                    </>
                  </div>
                </th>
                <th className="text-right">
                  <div className=" p-4">{t<string>('documents.List.table.actions')}</div>
                </th>
              </thead>
              <tbody>{renderDocuments()}</tbody>
            </table>
          </main>
        </div>
      </form>
    </MainLayout>
  );
};
