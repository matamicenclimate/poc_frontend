import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Card } from '@/componentes/Card/Card';
import { Button } from '@/componentes/Elements/Button/Button';
import { Title } from '@/componentes/Elements/Title/Title';
import { Input } from '@/componentes/Form/Inputs';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import { useWalletContext } from '@/providers/Wallet.context';
import { useCalculateCompensation } from '../api/calculateCompensation';
import { useBurnClimatecoins } from '../api/burnClimatecoins';
import { CompensationCalculation } from '../types';
import { Dialog } from '@/componentes/Dialog/Dialog';
import { useGetCompensations } from '../api/getCompensations';
import { useAuth } from '@/lib/auth';
import { CompensationHistory } from '../components/CompensationHistory';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';

export const Compensate = () => {
  const { t } = useTranslation();
  const { account, climatecoinBalance } = useWalletContext();
  const { user } = useAuth();
  const calculateCompensation = useCalculateCompensation();
  const compensations = useGetCompensations();
  const burnClimatecoins = useBurnClimatecoins();
  const [oracleResponse, setOracleResponse] = useState<null | CompensationCalculation>(null);
  const methods = useForm<any>({
    mode: 'onBlur',
  });

  const baseInputProps = {
    register: methods.register,
    control: methods.control,
    errors: methods.formState.errors,
    wrapperClassName: 'col-span-2',
  };

  const handleSubmit = (data: any) => {
    calculateCompensation
      .mutateAsync(data.amount)
      .then((oracleTxn) => setOracleResponse(oracleTxn));
  };

  const handleConfirmation = () => {
    if (!oracleResponse) return;
    burnClimatecoins
      .mutateAsync({
        ...oracleResponse,
      })
      .then(() => {
        setOracleResponse(null);
        methods.reset();
      });
  };

  return (
    <>
      <PageTitle
        title={t('climatecoins.Compensate.title')}
        description={t('climatecoins.Compensate.description')}
        linkTo=""
      />
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <Title size={5} as={2}>
              {t('climatecoins.Compensate.card.title')}
            </Title>
            <form className="space-y-5" onSubmit={methods.handleSubmit(handleSubmit)}>
              <Input
                {...baseInputProps}
                wrapperClassName="col-span-1"
                label={t('climatecoins.Compensate.amount.label')}
                name="amount"
                type="number"
                required
                max={climatecoinBalance()}
                placeholder={'0'}
              />

              {/*<span className="flex items-center font-normal text-primary">*/}
              {/*  {t('intlNumber', {*/}
              {/*    val: climatecoinBalance(),*/}
              {/*  })}{' '}*/}
              {/*  CC*/}
              {/*</span>*/}

              <div className="flex items-center space-x-4">
                <Button type="submit" size="md" disabled={calculateCompensation.isLoading}>
                  {t('climatecoins.Compensate.button')}
                </Button>
                {calculateCompensation.isLoading && <Spinner size="md" />}
              </div>
            </form>
          </Card>
          <Dialog
            isOpen={!!oracleResponse}
            setIsOpen={() => setOracleResponse(null)}
            onAccept={handleConfirmation}
            isLoading={burnClimatecoins.isLoading}
            title={'Are you sure'}
          ></Dialog>
        </div>
        <div>
          <Card>Some info</Card>
        </div>
        <div className="md:col-span-3">
          <CompensationHistory data={compensations} />
        </div>
      </div>
    </>
  );
};
