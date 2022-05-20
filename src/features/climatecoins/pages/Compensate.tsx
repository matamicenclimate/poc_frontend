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

export const Compensate = () => {
  const { t } = useTranslation();
  const { account, climatecoinBalance } = useWalletContext();
  const calculateCompensation = useCalculateCompensation();
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
    burnClimatecoins.mutate({
      ...oracleResponse,
    });
  };

  return (
    <>
      <PageTitle
        title={t('climatecoins.Compensate.title')}
        description={t('climatecoins.Compensate.description')}
        linkTo=""
      />
      <div className="grid md:grid-cols-3">
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
                defaultValue={0}
              />

              <span className="flex items-center font-normal text-primary">
                {t('intlNumber', {
                  val: climatecoinBalance(),
                })}{' '}
                CC
              </span>
              <div className="col-span-1">
                <p>{t('climatecoins.Compensate.wallet.label')}</p>
                <span>{account?.address}</span>
              </div>
              <Button type="submit" size="md">
                {t('climatecoins.Compensate.button')}
              </Button>
            </form>
          </Card>
          {!!oracleResponse && (
            <Card>
              <div>are u sure</div>
              <Button onClick={handleConfirmation} size="md">
                {t('climatecoins.Compensate.button')}
              </Button>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};
