import { UseQueryResult } from 'react-query';
import { Title } from '@/componentes/Elements/Title/Title';
import { Card } from '@/componentes/Card/Card';
import { Link } from '@/componentes/Elements/Link/Link';
import { EXPLORER_URL } from '@/config';
import { Compensation } from '../types';

export const CompensationHistory = ({ data }: { data: UseQueryResult<Compensation[]> }) => {
  const renderDocument = () => {
    if (data.data) {
      return (
        <div>
          {data.data.map((comp) => (
            <div key={comp.id}>
              {comp.id}
              <div>
                <Link href={`${EXPLORER_URL}tx/group/${encodeURIComponent(comp.txnId)}`}>
                  View txn
                </Link>{' '}
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
