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

import { ReactComponent as EmailIcon } from '@/assets/icons/bx-email-line.svg';
import { ReactComponent as IconUser } from '@/assets/icons/bx-user-line.svg';
import { ReactComponent as RightArrow } from '@/assets/icons/bx-arrow-right-line.svg';
import { ReactComponent as ShoppingBag } from '@/assets/icons/bx-shopping-bag.svg';
import { ReactComponent as WalletIcon } from '@/assets/icons/bx-wallet-line.svg';
import clsx from 'clsx';
import { useSort } from '@/hooks/useSort';

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
          <div>Hi, {user?.username}</div>
          <hr />
          <ul className="my-2 space-y-1">
            <li className="flex px-6 py-2">
              <RightArrow className="mr-3" />
              {t('documents.Upload.buys')}
            </li>
            <li className="flex px-6 py-2">
              <RightArrow className="mr-3" />
              {t('documents.Upload.sold')}
            </li>
            <li className="flex px-6 py-2 text-primary">
              <ShoppingBag className="mr-3 h-6 w-6 fill-primary" />
              {t('documents.Upload.projects')}
            </li>
          </ul>
          <hr />
          <ul className="my-2 space-y-1">
            <li className="flex px-6 py-2">
              <IconUser className="mr-3" />
              {t('documents.Upload.profile')}
            </li>
            <li className="flex px-6 py-2">
              <EmailIcon className="mr-3" />
              {t('documents.Upload.notifications')}
            </li>
            <li className="flex px-6 py-2">
              <WalletIcon className="mr-3 " />
              {t('documents.Upload.wallet')}
            </li>
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
            <thead className="text-xs text-neutral-4">
              <th>
                <div className={clsx('flex cursor-pointer')} onClick={() => toggleSort('status')}>
                  Status
                  {renderArrow('status')}
                </div>
              </th>
              <th>
                <div className={clsx('flex cursor-pointer')} onClick={() => toggleSort('title')}>
                  Project name
                  {renderArrow('title')}
                </div>
              </th>
              <th className="flex">
                <div
                  className={clsx('flex cursor-pointer')}
                  onClick={() => toggleSort('serial_number')}
                >
                  ID Operation
                  {renderArrow('serial_number')}
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
