import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Card } from '@/componentes/Card/Card';
import { Button } from '@/componentes/Elements/Button/Button';
import { Link } from '@/componentes/Elements/Link/Link';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { Title } from '@/componentes/Elements/Title/Title';
import { Input } from '@/componentes/Form/Inputs';
import { Select } from '@/componentes/Form/Select';
import { Stepper, useStepper } from '@/componentes/Stepper/Stepper';
import { useCurrencyContext } from '@/providers/Currency.context';
import { useWalletContext } from '@/providers/Wallet.context';

import { useBurnClimatecoins } from '../api/burnClimatecoins';
import { useCalculateCompensation } from '../api/calculateCompensation';
import { CompensationCalculation } from '../types';

export enum CompensateSteps {
  INITIAL = 0,
  CONFIRMATION = 1,
  SUCCESS = 2,
}
const dtClassName = '';
const ddClassName = 'font-bold text-neutral-2';
export const CompensateForm = ({ defaultAddress }: { defaultAddress: string }) => {
  const { t } = useTranslation();
  const { account, climatecoinBalance } = useWalletContext();
  const calculateCompensation = useCalculateCompensation();
  const burnClimatecoins = useBurnClimatecoins();
  const { formatter, climatecoinValue } = useCurrencyContext();

  const [oracleResponse, setOracleResponse] = useState<null | CompensationCalculation>(null);
  const methods = useForm<any>({
    mode: 'onBlur',
    defaultValues: {
      wallet: { value: defaultAddress, label: defaultAddress },
    },
  });

  const baseInputProps = {
    register: methods.register,
    control: methods.control,
    errors: methods.formState.errors,
    wrapperClassName: 'col-span-2',
  };

  const handleSubmit = (data: any) => {
    Promise.all([
      nextStep(),
      calculateCompensation.mutateAsync(data.amount).then((oracleTxn) => {
        setOracleResponse(oracleTxn);
      }),
    ]).catch((e) => setCurrStep(CompensateSteps.INITIAL));
  };
  const navigate = useNavigate();

  const handleConfirmation = () => {
    if (!oracleResponse) return Promise.reject('No oracle response');
    burnClimatecoins.mutate(
      {
        ...oracleResponse,
      },
      {
        onSuccess: (res) => {
          setOracleResponse(null);
          navigate(`/coins/compensate/${res.id}`);
        },
      }
    );
  };

  const { currStep, nextStep, prevStep, setCurrStep } = useStepper(CompensateSteps);

  return (
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
              <Select
                name="wallet"
                label={t('compensations.Compensate.wallet.label')}
                required
                options={[{ value: account?.address, label: account?.address ?? '' }]}
                {...baseInputProps}
              />
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
              <dl className="grid grid-cols-2 gap-4 rounded border p-4 text-sm text-neutral-4">
                <div>
                  <dt className={dtClassName}>Total coins to compensate</dt>
                  <dd className={clsx(ddClassName, 'text-primary-green')}>
                    {t('intlNumber', { val: methods.getValues('amount') })} cc
                  </dd>
                </div>
                <div>
                  <dt className={dtClassName}>Total</dt>
                  <dd className={ddClassName}>
                    {formatter(climatecoinValue(methods.getValues('amount')))}
                  </dd>
                </div>
                <hr className="col-span-2" />
                <div className="col-span-2">
                  <dt className={dtClassName}>Wallet address</dt>
                  <dd className={ddClassName}>{account?.address}</dd>
                </div>
              </dl>
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
    </div>
  );
};
