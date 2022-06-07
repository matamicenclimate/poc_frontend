import { useTranslation } from 'react-i18next';
import { UseQueryResult } from 'react-query';

import { Card } from '@/componentes/Card/Card';
import { Link } from '@/componentes/Elements/Link/Link';
import { Title } from '@/componentes/Elements/Title/Title';
import { EXPLORER_URL, IPFS_GATEWAY_URL } from '@/config';

import { Compensation } from '../types';

export const CompensationHistory = ({ data }: { data: UseQueryResult<Compensation[]> }) => {
  const { t } = useTranslation();
  const renderDocument = () => {
    if (data.data) {
      return (
        <div className="divide-y">
          {data.data.map((comp) => (
            <div key={comp.id}>
              <div className="flex gap-2 py-3">
                <div>
                  {comp.amount} tonnes of CO2 compensated
                  <br />
                  <div className="flex space-x-2">
                    <Link
                      href={`${EXPLORER_URL}tx/group/${encodeURIComponent(comp.txn_id)}`}
                      className="inline-flex items-center text-xs"
                    >
                      View txn{' '}
                      <img
                        role="figure"
                        src="/icons/algoexplorer.png"
                        className="h-3 w-3 rounded-full"
                      />
                    </Link>{' '}
                    <Link
                      href={`${IPFS_GATEWAY_URL}${comp.consolidation_certificate_ipfs_cid}`}
                      className="inline-flex items-center text-xs"
                    >
                      View certificate
                    </Link>{' '}
                  </div>
                </div>
                <div className="flex-grow" />
                <div>{t('intlDateTime', { val: comp.createdAt })}</div>
              </div>
            </div>
          ))}
        </div>
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
    <Card>
      <Title size={3} as={5}>
        Compensation History
      </Title>
      {renderDocument()}
    </Card>
  );
};
