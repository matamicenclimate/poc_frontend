import clsx from 'clsx';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { UseQueryResult } from 'react-query';

import { Link } from '@/componentes/Elements/Link/Link';
import { Title } from '@/componentes/Elements/Title/Title';
import { Aside } from '@/componentes/Layout/Aside/Aside';
import { OperationsMenu } from '@/componentes/Layout/Aside/components/OperationsMenu';
import { PersonalMenu } from '@/componentes/Layout/Aside/components/PersonalMenu';
import { EXPLORER_URL, IPFS_GATEWAY_URL } from '@/config';
import { useAuth } from '@/lib/auth';

import { Compensation } from '../types';

export const CompensationHistory = ({ data }: { data: UseQueryResult<Compensation[]> }) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const getProfileAvatar = () => {
    if (user?.avatar?.url) {
      return user?.avatar.url;
    }
    return 'avatar-placeholder.jpg';
  };

  const thStyles = 'flex cursor-pointer text-sm items-center pb-3';
  const linkStyles = 'inline-flex items-center';

  const renderTable = () => {
    if (data.data) {
      return (
        <>
          {data.data.map((comp) => (
            <tbody key={comp.id}>
              <td>
                <p>{comp.amount}</p>
              </td>
              <td>
                <Link
                  href={`${EXPLORER_URL}tx/group/${encodeURIComponent(comp.txn_id)}`}
                  className={linkStyles}
                >
                  {t('compensate.History.table.txnView')}
                  <img
                    role="figure"
                    src="/icons/algoexplorer.png"
                    className="ml-1 h-3 w-3 rounded-full"
                  />
                </Link>
              </td>
              <td>
                <Link
                  href={`${IPFS_GATEWAY_URL}${comp.consolidation_certificate_ipfs_cid}`}
                  className={linkStyles}
                >
                  {t('compensate.History.table.certificateView')}
                </Link>
              </td>
              <td>
                <Link to={`/coins/compensate/${comp.id}`}>
                  {t('compensate.History.table.details')}
                </Link>
              </td>
              <td className="text-right">
                <div>{format(new Date(comp.createdAt), 'yyyy/MM/dd')}</div>

                {/* <div>{t('intlDateTime', { val: comp.createdAt })}</div> */}
              </td>
              <td className="text-right">
                <div>{format(new Date(comp.createdAt), 'HH:mm')}</div>

                {/* <div>{t('intlDateTime', { val: comp.createdAt })}</div> */}
              </td>
            </tbody>
          ))}
        </>
      );
    }
    if (data.error instanceof Error) {
      return <>{('An error has occurred: ' + data.error.message) as string}</>;
    }
    return (
      <div>
        <div>{'Loading...'}</div>
      </div>
    );
  };
  return (
    <div className="mt-16 grid gap-8 md:grid-cols-4">
      <aside className="text-sm text-neutral-4">
        <img src={getProfileAvatar()} className="h-32 rounded-full" />
        <div className="mb-4 mt-8 flex flex-col capitalize ">
          <div className="text-2xl  text-black">
            {t('documents.Upload.hi')}
            {user?.username?.split('@')[0]} 👋🏻
          </div>
          <div className="mt-2 text-lg text-neutral-5">
            {user?.type}
            {user?.country?.name && `, ${user.country.name}`}
          </div>
        </div>
        <hr />
        <Aside menu={OperationsMenu()} />
        <hr />
        <Aside menu={PersonalMenu()} />
      </aside>
      <main className="space-y-4 md:col-span-3">
        <div className="items-left flex flex-col space-x-2 space-y-6">
          <Title size={3} as={5} className="mb-3">
            {t('compensate.History.title')}
          </Title>
          <table className="font-Poppins w-full text-sm font-medium text-primary">
            <thead className="border-b-2 border-neutral-6 text-left text-xs text-neutral-4">
              <th>
                <div className={clsx(thStyles)}>{t('compensate.History.table.amount')}</div>
              </th>
              <th>
                <div className={clsx(thStyles)}>{t('compensate.History.table.txn')}</div>
              </th>
              <th>
                <div className={clsx(thStyles)}>{t('compensate.History.table.certificate')}</div>
              </th>
              <th>
                <div className={clsx(thStyles)}>{t('compensate.History.table.details')}</div>
              </th>
              <th className="text-right">
                <div>{t('compensate.History.table.date')}</div>
              </th>
              <th className="text-right">
                <div>{t('compensate.History.table.time')}</div>
              </th>
            </thead>

            {renderTable()}
          </table>
        </div>
      </main>
    </div>
  );
};
