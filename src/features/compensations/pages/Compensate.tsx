import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Card } from '@/componentes/Card/Card';
import { Button } from '@/componentes/Elements/Button/Button';
import { Link } from '@/componentes/Elements/Link/Link';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { Title } from '@/componentes/Elements/Title/Title';
import { Input } from '@/componentes/Form/Inputs';
import { Select } from '@/componentes/Form/Select';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import { Stepper, useStepper } from '@/componentes/Stepper/Stepper';
import { useCurrencyContext } from '@/providers/Currency.context';
import { useWalletContext } from '@/providers/Wallet.context';

import { useBurnClimatecoins } from '../api/burnClimatecoins';
import { useCalculateCompensation } from '../api/calculateCompensation';
import { useGetCompensations } from '../api/getCompensations';
import { CompensationHistory } from '../components/CompensationHistory';
import { CompensationCalculation } from '../types';

export enum CompensateSteps {
  INITIAL = 0,
  CONFIRMATION = 1,
  SUCCESS = 2,
}
const CLIMATECOIN_PRICE = 10;
export const Compensate = () => {
  const { t } = useTranslation();
  const { account, climatecoinBalance } = useWalletContext();
  const calculateCompensation = useCalculateCompensation();
  const compensations = useGetCompensations();
  const burnClimatecoins = useBurnClimatecoins();
  const { formatter, climatecoinValue } = useCurrencyContext();

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
    nextStep();
    calculateCompensation
      .mutateAsync(data.amount)
      .then((oracleTxn) => {
        setOracleResponse(oracleTxn);
      })
      .catch((e) => setCurrStep(CompensateSteps.INITIAL));
  };
  const navigate = useNavigate();

  const handleConfirmation = () => {
    if (!oracleResponse) return;
    burnClimatecoins
      .mutateAsync({
        ...oracleResponse,
      })
      .then((res) => {
        setOracleResponse(null);
        methods.reset();
        navigate(`/coins/compensate/${res.id}`);
      });
  };

  const { currStep, nextStep, prevStep, setCurrStep } = useStepper(CompensateSteps);

  return (
    <>
      <PageTitle
        title={t('compensations.Compensate.title')}
        description={t('compensations.Compensate.description')}
        linkTo=""
      />
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <Stepper
            stepsEnum={CompensateSteps}
            setCurrStep={setCurrStep}
            currStep={currStep}
            translationRoot="compensations.Compensate.stepper"
            disableFutureSteps={true}
          />
        </div>
        <div className="flex flex-col space-y-8 md:col-span-2">
          {currStep === CompensateSteps.INITIAL && (
            <Card>
              <Title size={5} as={2}>
                {t('compensations.Compensate.card.title')}
              </Title>
              <form className="mt-6 space-y-8" onSubmit={methods.handleSubmit(handleSubmit)}>
                {account?.address ? (
                  <Select
                    name="wallet"
                    label={t('compensations.Compensate.wallet.label')}
                    required
                    defaultValues={{ value: account?.address, label: account?.address ?? '' }}
                    options={[{ value: account?.address, label: account?.address ?? '' }]}
                    {...baseInputProps}
                  />
                ) : null}
                <div className="space-y-2">
                  <Input
                    {...baseInputProps}
                    wrapperClassName="col-span-1"
                    label={t('compensations.Compensate.amount.label')}
                    name="amount"
                    type="number"
                    required
                    max={climatecoinBalance()}
                    inputClassName="border-0 text-[5rem] w-full text-center"
                    placeholder={'00.00'}
                  />
                  <div className="text-center text-xl">
                    {formatter(climatecoinValue(methods.watch('amount')))}
                  </div>

                  <div className="flex justify-center gap-4">
                    {[25, 50, 100, climatecoinBalance()].map((amt, i) => (
                      <Button
                        type="button"
                        key={amt}
                        size="xs"
                        onClick={() => methods.setValue('amount', amt)}
                      >
                        {i === 3 ? `Max(${amt})` : amt}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <Button type="submit" size="md" disabled={calculateCompensation.isLoading}>
                    {t('compensations.Compensate.button')}
                  </Button>
                </div>
              </form>
            </Card>
          )}
          {currStep === CompensateSteps.CONFIRMATION && (
            <Card>
              <div className="space-y-8">
                <Title size={5} as={2}>
                  {t('compensations.Compensate.steps.accept.title')}
                </Title>
                <p className="text-sm text-neutral-4">
                  {t('compensations.Compensate.steps.accept.description', {
                    amount: t('intlNumber', { val: methods.getValues('amount') }),
                  })}{' '}
                  <Link to="/">Read more</Link>
                </p>
                <div className="space-y-4 rounded border p-4 text-sm">
                  <div className="grid grid-cols-2">
                    <dl>
                      <dt>Total coins to compensate</dt>
                      <dd>{t('intlNumber', { val: methods.getValues('amount') })}</dd>
                    </dl>
                    <dl>
                      <dt>Total</dt>
                      <dd>{formatter(climatecoinValue(methods.getValues('amount')))}</dd>
                    </dl>
                  </div>
                  <hr />
                  <dl>
                    <dt>Wallet address</dt>
                    <dd>{account?.address}</dd>
                  </dl>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div></div>
                  <div className="flex items-center justify-end">
                    {(calculateCompensation.isLoading || burnClimatecoins.isLoading) && (
                      <Spinner size="md" />
                    )}
                  </div>
                  <Button
                    disabled={calculateCompensation.isLoading || burnClimatecoins.isLoading}
                    onClick={handleConfirmation}
                  >
                    {t('documents.Upload.stepper.continue')}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
        <div className="col-span-3">
          <CompensationHistory data={compensations} />
        </div>
      </div>
    </>
  );
};
